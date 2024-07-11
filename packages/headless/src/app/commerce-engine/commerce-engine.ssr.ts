/**
 * Utility functions to be used for Server Side Rendering.
 */
import {UnknownAction} from '@reduxjs/toolkit';
import {stateKey} from '../../app/state-key';
import {buildProductListing} from '../../controllers/commerce/product-listing/headless-product-listing';
import type {Controller} from '../../controllers/controller/headless-controller';
import {LegacySearchAction} from '../../features/analytics/analytics-utils';
import {createWaitForActionMiddleware} from '../../utils/utils';
import {NavigatorContextProvider} from '../navigatorContextProvider';
import {
  buildControllerDefinitions,
  composeFunction,
  createStaticState,
} from '../ssr-engine/common';
import {
  ControllerDefinitionsMap,
  InferControllerPropsMapFromDefinitions,
} from '../ssr-engine/types/common';
import {
  EngineDefinition,
  EngineDefinitionOptions,
} from '../ssr-engine/types/core-engine';
import {
  CommerceEngine,
  CommerceEngineOptions,
  buildCommerceEngine,
} from './commerce-engine';

/**
 * The SSR commerce engine.
 */
export interface SSRCommerceEngine extends CommerceEngine {
  /**
   * Waits for the search to be completed and returns a promise that resolves to a `SearchCompletedAction`.
   */
  waitForSearchCompletedAction(): Promise<SearchCompletedAction>;
}

export type CommerceEngineDefinitionOptions<
  TControllers extends ControllerDefinitionsMap<SSRCommerceEngine, Controller>,
> = EngineDefinitionOptions<CommerceEngineOptions, TControllers>;

export type SearchCompletedAction = ReturnType<
  LegacySearchAction['fulfilled' | 'rejected']
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function isSearchCompletedAction(
//   action: unknown
// ): action is SearchCompletedAction {
//   return /^search\/executeSearch\/(fulfilled|rejected)$/.test(
//     (action as UnknownAction).type
//   );
// }

function isListingFetchCompletedAction(
  action: unknown
): action is SearchCompletedAction {
  // TODO: find a cleaner way to check if the action is a listing fetch action or a commerce search
  // TODO: this will be used in the case of a listing page
  const listingAction =
    /^commerce\/productListing\/fetch\/(fulfilled|rejected)$/.test(
      (action as UnknownAction).type
    );
  // TODO: this will be used in the case of a search page
  const searchAction =
    /^commerce\/search\/executeSearch\/(fulfilled|rejected)$/.test(
      (action as UnknownAction).type
    );
  return listingAction || searchAction;
}

function buildSSRCommerceEngine(
  options: CommerceEngineOptions
): SSRCommerceEngine {
  const {middleware, promise} = createWaitForActionMiddleware(
    // isSearchCompletedAction // TODO: maybe a argument to pass the action type
    isListingFetchCompletedAction
  );
  const commerceEngine = buildCommerceEngine({
    ...options,
    middlewares: [...(options.middlewares ?? []), middleware],
  });
  return {
    ...commerceEngine,

    get [stateKey]() {
      return commerceEngine[stateKey];
    },

    waitForSearchCompletedAction() {
      return promise;
    },
  };
}

export interface CommerceEngineDefinition<
  TControllers extends ControllerDefinitionsMap<SSRCommerceEngine, Controller>,
> extends EngineDefinition<
    SSRCommerceEngine,
    TControllers,
    CommerceEngineOptions
  > {}

/**
 * Initializes a Commerce engine definition in SSR with given controllers definitions and commerce engine config.
 * @param options - The commerce engine definition
 * @returns Three utility functions to fetch the initial state of the engine in SSR, hydrate the state in CSR,
 *  and a build function that can be used for edge cases requiring more control.
 */
export function defineCommerceEngine<
  TControllerDefinitions extends ControllerDefinitionsMap<
    CommerceEngine,
    Controller
  >,
>(
  // TODO: add a type (search / listing) for the controller definitions
  options: CommerceEngineDefinitionOptions<TControllerDefinitions>
): CommerceEngineDefinition<TControllerDefinitions> & {
  setNavigatorContext: (
    navigatorContextProvider: NavigatorContextProvider
  ) => void;
} {
  const {controllers: controllerDefinitions, ...engineOptions} = options;
  type Definition = CommerceEngineDefinition<TControllerDefinitions>;
  type BuildFunction = Definition['build'];
  type FetchStaticStateFunction = Definition['fetchStaticState'];
  type HydrateStaticStateFunction = Definition['hydrateStaticState'];
  type FetchStaticStateFromBuildResultFunction =
    FetchStaticStateFunction['fromBuildResult'];
  type HydrateStaticStateFromBuildResultFunction =
    HydrateStaticStateFunction['fromBuildResult'];
  type BuildParameters = Parameters<BuildFunction>;
  type FetchStaticStateParameters = Parameters<FetchStaticStateFunction>;
  type HydrateStaticStateParameters = Parameters<HydrateStaticStateFunction>;
  type FetchStaticStateFromBuildResultParameters =
    Parameters<FetchStaticStateFromBuildResultFunction>;
  type HydrateStaticStateFromBuildResultParameters =
    Parameters<HydrateStaticStateFromBuildResultFunction>;

  class Opts {
    constructor(private options: typeof engineOptions) {}

    set navigatorContextProvider(
      navigatorContextProvider: NavigatorContextProvider
    ) {
      this.options.navigatorContextProvider = navigatorContextProvider;
    }

    get() {
      // console.log(
      //   '::::: extend navigatorContextProvider',
      //   this.options.navigatorContextProvider
      // );
      return this.options;
    }
  }

  const opts = new Opts(engineOptions);

  // const getOpts = () => {
  // console.log('::::: extend navigatorContextProvider', engineOptions.navigatorContextProvider);
  //   return engineOptions;
  // };

  const build: BuildFunction = async (...[buildOptions]: BuildParameters) => {
    // console.log('::::: build');
    const engine = buildSSRCommerceEngine(
      buildOptions?.extend ? await buildOptions.extend(opts.get()) : opts.get()
    );
    const controllers = buildControllerDefinitions({
      definitionsMap: (controllerDefinitions ?? {}) as TControllerDefinitions,
      engine,
      propsMap: (buildOptions && 'controllers' in buildOptions
        ? buildOptions.controllers
        : {}) as InferControllerPropsMapFromDefinitions<TControllerDefinitions>,
    });
    return {
      engine,
      controllers,
    };
  };

  const fetchStaticState: FetchStaticStateFunction = composeFunction(
    async (...params: FetchStaticStateParameters) => {
      // console.log('::::: fetchStaticState');
      const buildResult = await build(...params);
      const staticState = await fetchStaticState.fromBuildResult({
        buildResult,
      });
      return staticState;
    },
    {
      fromBuildResult: async (
        ...params: FetchStaticStateFromBuildResultParameters
      ) => {
        const [
          {
            buildResult: {engine, controllers},
          },
        ] = params;

        const productListing = buildProductListing(engine);
        // TODO: tracking id should not be undefined
        productListing.executeFirstRequest();
        //  TODO: should now call the appropriate controller
        // this.searchOrListing =
        //   this.type === 'product-listing'
        //     ? buildProductListing(this.engine!)
        //     : buildSearch(this.engine!);

        return createStaticState({
          searchAction: await engine.waitForSearchCompletedAction(),
          controllers,
        });
      },
    }
  );

  const hydrateStaticState: HydrateStaticStateFunction = composeFunction(
    async (...params: HydrateStaticStateParameters) => {
      // console.log('::::: hydrateStaticState', params);
      const buildResult = await build(...(params as BuildParameters));
      const staticState = await hydrateStaticState.fromBuildResult({
        buildResult,
        searchAction: params[0]!.searchAction,
      });
      return staticState;
    },
    {
      fromBuildResult: async (
        ...params: HydrateStaticStateFromBuildResultParameters
      ) => {
        const [
          {
            buildResult: {engine, controllers},
            searchAction,
          },
        ] = params;
        engine.dispatch(searchAction);
        await engine.waitForSearchCompletedAction();
        return {engine, controllers};
      },
    }
  );

  const setNavigatorContext = (
    navigatorContextProvider: NavigatorContextProvider
  ) => {
    // opts.navigatorContextProvider = navigatorContextProvider;
    // console.log('::::: setNavigatorContext');
    engineOptions.navigatorContextProvider = navigatorContextProvider;
  };

  return {
    build,
    fetchStaticState,
    hydrateStaticState,
    setNavigatorContext,
  };
}
