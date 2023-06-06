import {isNullOrUndefined, isUndefined} from '@coveo/bueno';
import {
  AnyAction,
  Dispatch,
  ThunkDispatch,
  Unsubscribe,
  ReducersMapObject,
  StateFromReducersMapObject,
  Middleware,
  Reducer,
} from '@reduxjs/toolkit';
import {Logger} from 'pino';
import {
  disableAnalytics,
  enableAnalytics,
  updateAnalyticsConfiguration,
  UpdateAnalyticsConfigurationActionCreatorPayload,
  updateBasicConfiguration,
} from '../features/configuration/configuration-actions';
import {versionReducer as version} from '../features/debug/version-slice';
import {SearchParametersState} from '../state/search-app-state';
import {matchCoveoOrganizationEndpointUrlAnyOrganization} from '../utils/url-utils';
import {doNotTrack} from '../utils/utils';
import {analyticsMiddleware} from './analytics-middleware';
import {configuration} from './common-reducers';
import {EngineConfiguration} from './engine-configuration';
import {instantlyCallableThunkActionMiddleware} from './instantly-callable-middleware';
import {LoggerOptions} from './logger';
import {logActionErrorMiddleware} from './logger-middlewares';
import {createReducerManager, ReducerManager} from './reducer-manager';
import {createRenewAccessTokenMiddleware} from './renew-access-token-middleware';
import {Store, configureStore} from './store';
import {ThunkExtraArguments} from './thunk-extra-arguments';

const coreReducers = {configuration, version};
type CoreState = StateFromReducersMapObject<typeof coreReducers> &
  Partial<SearchParametersState>;

type EngineDispatch<
  State,
  ExtraArguments extends ThunkExtraArguments
> = ThunkDispatch<State, ExtraArguments, AnyAction> & Dispatch<AnyAction>;

export interface CoreEngine<
  State extends object = {},
  ExtraArguments extends ThunkExtraArguments = ThunkExtraArguments
> {
  /**
   * Dispatches an action directly. This is the only way to trigger a state change.
   * Each headless controller dispatches its own actions.
   *
   * @param action An action supported by the headless engine.
   *
   * @returns For convenience, the action object that was just dispatched.
   */
  dispatch: EngineDispatch<State & CoreState, ExtraArguments>;
  /**
   * Adds a change listener. It will be called any time an action is
   * dispatched, and some part of the state tree may potentially have changed.
   * You may then access the new `state`.
   *
   * @param listener A callback to be invoked on every dispatch.
   * @returns A function to remove this change listener.
   */
  subscribe(listener: () => void): Unsubscribe;
  /**
   * The complete headless state tree.
   */
  state: State & CoreState;
  /**
   * The redux store.
   */
  store: Store;
  /**
   * The logger instance used by headless.
   * */
  logger: Logger;
  /**
   * Adds the specified reducers to the store.
   *
   * @param reducers - An object containing the reducers to attach to the engine.
   */
  addReducers(reducers: ReducersMapObject): void;
  /**
   * Enable analytics tracking
   */
  enableAnalytics(): void;
  /**
   * Disable analytics tracking
   */
  disableAnalytics(): void;
}

export interface EngineOptions<Reducers extends ReducersMapObject>
  extends ExternalEngineOptions<StateFromReducersMapObject<Reducers>> {
  /**
   * Map object of reducers.
   * A reducer is a pure function that takes the previous state and an action, and returns the next state.
   * ```
   * (previousState, action) => nextState
   * ```
   * [Redux documentation on reducers.](https://redux.js.org/glossary#reducer)
   */
  reducers: Reducers;
  /**
   * An optional cross reducer (aka: root reducer) that can be combined with the slice reducers.
   *
   * [Redux documentation on root reducers.](https://redux.js.org/usage/structuring-reducers/beyond-combinereducers)
   */
  crossReducer?: Reducer;
}

export interface ExternalEngineOptions<State extends object> {
  /**
   * The global headless engine configuration options.
   */
  configuration: EngineConfiguration;

  /**
   * The initial headless state.
   * You may optionally specify it to hydrate the state
   * from the server in universal apps, or to restore a previously serialized
   * user session.
   */
  preloadedState?: State;
  /**
   * List of additional middlewares.
   * A middleware is a higher-order function that composes a dispatch function to return a new dispatch function.
   * It is useful for logging actions, performing side effects like routing, or turning an asynchronous API call into a series of synchronous actions.
   *
   * @example
   * ```
   * type MiddlewareAPI = { dispatch: Dispatch, getState: () => State }
   * type Middleware = (api: MiddlewareAPI) => (next: Dispatch) => Dispatch
   * ```
   * [Redux documentation on middlewares.](https://redux.js.org/glossary#middleware)
   */
  middlewares?: Middleware<{}, State>[];
  /**
   * The logger options.
   */
  loggerOptions?: LoggerOptions;
}

function getUpdateAnalyticsConfigurationPayload(
  options: EngineOptions<ReducersMapObject>,
  logger: Logger
): UpdateAnalyticsConfigurationActionCreatorPayload | null {
  const apiBaseUrl =
    options.configuration.organizationEndpoints?.analytics || undefined;
  const {analyticsClientMiddleware: _, ...payload} =
    options.configuration.analytics ?? {};

  const payloadWithURL = {
    ...payload,
    apiBaseUrl,
  };

  if (doNotTrack()) {
    logger.info('Analytics disabled since doNotTrack is active.');
    return {
      ...payloadWithURL,
      enabled: false,
    };
  }

  return payloadWithURL;
}

export function buildEngine<
  Reducers extends ReducersMapObject,
  ExtraArguments extends ThunkExtraArguments
>(
  options: EngineOptions<Reducers>,
  thunkExtraArguments: ExtraArguments
): CoreEngine<StateFromReducersMapObject<Reducers>, ExtraArguments> {
  const engine = buildCoreEngine(options, thunkExtraArguments);
  const {accessToken, organizationId} = options.configuration;
  const {organizationEndpoints} = options.configuration;
  const platformUrl =
    organizationEndpoints?.platform || options.configuration.platformUrl;

  if (shouldWarnAboutPlatformURL(options)) {
    engine.logger.warn(
      `The \`platformUrl\` (${options.configuration.platformUrl}) option will be deprecated in the next major version. Consider using the \`organizationEndpoints\` option instead. See [Organization endpoints](https://docs.coveo.com/en/mcc80216).`
    );
  }

  if (shouldWarnAboutOrganizationEndpoints(options)) {
    // @v3 make organizationEndpoints the default.
    engine.logger.warn(
      'The `organizationEndpoints` options was not explicitly set in the Headless engine configuration. Coveo recommends setting this option, as it has resiliency benefits and simplifies the overall configuration for multi-region deployments. See [Organization endpoints](https://docs.coveo.com/en/mcc80216).'
    );
  } else if (
    shouldWarnAboutMismatchBetweenOrganizationIDAndOrganizationEndpoints(
      options
    )
  ) {
    engine.logger.warn(
      `There is a mismatch between the \`organizationId\` option (${options.configuration.organizationId}) and the organization configured in the \`organizationEndpoints\` option (${options.configuration.organizationEndpoints?.platform}). This could lead to issues that are complex to troubleshoot. Please make sure both values match.`
    );
  }

  engine.dispatch(
    updateBasicConfiguration({
      accessToken,
      organizationId,
      platformUrl,
    })
  );

  const analyticsPayload = getUpdateAnalyticsConfigurationPayload(
    options,
    engine.logger
  );
  if (analyticsPayload) {
    engine.dispatch(updateAnalyticsConfiguration(analyticsPayload));
  }

  return engine;
}

function buildCoreEngine<
  Reducers extends ReducersMapObject,
  ExtraArguments extends ThunkExtraArguments
>(
  options: EngineOptions<Reducers>,
  thunkExtraArguments: ExtraArguments
): CoreEngine<StateFromReducersMapObject<Reducers>, ExtraArguments> {
  const {reducers} = options;
  const reducerManager = createReducerManager({...coreReducers, ...reducers});
  if (options.crossReducer) {
    reducerManager.addCrossReducer(options.crossReducer);
  }
  const logger = thunkExtraArguments.logger;
  const store = createStore(options, thunkExtraArguments, reducerManager);

  return {
    addReducers(reducers: ReducersMapObject) {
      if (reducerManager.containsAll(reducers)) {
        return;
      }

      reducerManager.add(reducers);
      store.replaceReducer(reducerManager.combinedReducer);
    },

    dispatch: store.dispatch,

    subscribe: store.subscribe,

    enableAnalytics() {
      store.dispatch(enableAnalytics());
    },

    disableAnalytics() {
      store.dispatch(disableAnalytics());
    },

    get state() {
      return store.getState();
    },

    logger,

    store,
  };
}

function createStore<
  Reducers extends ReducersMapObject,
  ExtraArguments extends ThunkExtraArguments
>(
  options: EngineOptions<Reducers>,
  thunkExtraArguments: ExtraArguments,
  reducerManager: ReducerManager
) {
  const {preloadedState, configuration} = options;
  const name = configuration.name || 'coveo-headless';
  const middlewares = createMiddleware(options, thunkExtraArguments.logger);

  return configureStore({
    preloadedState,
    reducer: reducerManager.combinedReducer,
    middlewares,
    thunkExtraArguments,
    name,
  });
}

function createMiddleware<Reducers extends ReducersMapObject>(
  options: EngineOptions<Reducers>,
  logger: Logger
) {
  const {renewAccessToken} = options.configuration;
  const renewTokenMiddleware = createRenewAccessTokenMiddleware(
    logger,
    renewAccessToken
  );

  return [
    instantlyCallableThunkActionMiddleware,
    renewTokenMiddleware,
    logActionErrorMiddleware(logger),
    analyticsMiddleware,
  ].concat(options.middlewares || []);
}

function shouldWarnAboutOrganizationEndpoints(
  options: EngineOptions<ReducersMapObject>
) {
  return isUndefined(options.configuration.organizationEndpoints);
}

function shouldWarnAboutPlatformURL(options: EngineOptions<ReducersMapObject>) {
  return (
    !isNullOrUndefined(options.configuration.platformUrl) ||
    isNullOrUndefined(options.configuration.organizationEndpoints?.platform)
  );
}

function shouldWarnAboutMismatchBetweenOrganizationIDAndOrganizationEndpoints(
  options: EngineOptions<ReducersMapObject>
) {
  const {platform} = options.configuration.organizationEndpoints!;

  if (isUndefined(platform)) {
    return false;
  }

  const match = matchCoveoOrganizationEndpointUrlAnyOrganization(platform);
  return match && match.organizationId !== options.configuration.organizationId;
}
