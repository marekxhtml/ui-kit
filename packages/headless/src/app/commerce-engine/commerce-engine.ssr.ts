/**
 * Utility functions to be used for Commerce Server Side Rendering.
 */
import {Action, AnyAction, UnknownAction} from '@reduxjs/toolkit';
import {stateKey} from '../../app/state-key';
import {
  defineFacets,
  defineQuerySummary,
} from '../../controllers/commerce/core/sub-controller/headless-sub-controller.ssr';
import {buildProductListing} from '../../controllers/commerce/product-listing/headless-product-listing';
import {buildSearch} from '../../controllers/commerce/search/headless-search';
import type {Controller} from '../../controllers/controller/headless-controller';
import {createWaitForActionMiddleware} from '../../utils/utils';
import {
  buildControllerDefinitions,
  composeFunction,
  createStaticState,
} from '../ssr-engine/common';
import {
  ControllerDefinitionsMap,
  InferControllerPropsMapFromDefinitions,
  SolutionType,
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
import {getSampleCommerceEngineConfiguration} from './commerce-engine-configuration';

// TODO: remove this when the search engine is refactored
export interface SSRCommerceEngineOptions extends CommerceEngineOptions {}

/**
 * The SSR commerce engine.
 */
export interface SSRCommerceEngine extends CommerceEngine {
  /**
   * Waits for the search to be completed and returns a promise that resolves to a `SearchCompletedAction`.
   */
  waitForRequestCompletedAction(): Promise<Action>;
}

export type CommerceEngineDefinitionOptions<
  TControllers extends ControllerDefinitionsMap<SSRCommerceEngine, Controller>,
> = EngineDefinitionOptions<SSRCommerceEngineOptions, TControllers>;

function isListingFetchCompletedAction(action: unknown): action is Action {
  return /^commerce\/productListing\/fetch\/(fulfilled|rejected)$/.test(
    (action as UnknownAction).type
  );
}

function isSearchCompletedAction(action: unknown): action is Action {
  return /^commerce\/search\/executeSearch\/(fulfilled|rejected)$/.test(
    (action as UnknownAction).type
  );
}

function buildSSRCommerceEngine(
  solutionType: SolutionType,
  options: SSRCommerceEngineOptions
): SSRCommerceEngine {
  const {middleware, promise} = createWaitForActionMiddleware(
    // solutionType === SolutionType.Listing
    solutionType === 'listing'
      ? isListingFetchCompletedAction
      : isSearchCompletedAction
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

    waitForRequestCompletedAction() {
      return promise;
    },
  };
}

export interface CommerceEngineDefinition<
  TControllers extends ControllerDefinitionsMap<SSRCommerceEngine, Controller>,
> extends EngineDefinition<
    SSRCommerceEngine,
    TControllers,
    SSRCommerceEngineOptions
  > {}

export interface MultiSolutionTypeCommerceEngineDefinition<
  TControllers extends ControllerDefinitionsMap<SSRCommerceEngine, Controller>,
> {
  ListingSSR: CommerceEngineDefinition<TControllers>;
  SearchSSR: CommerceEngineDefinition<TControllers>;
}

/**
 * Initializes a Commerce engine definition in SSR with given controllers definitions and commerce engine config.
 * @param options - The commerce engine definition
 * @returns Three utility functions to fetch the initial state of the engine in SSR, hydrate the state in CSR,
 *  and a build function that can be used for edge cases requiring more control.
 */
export function defineCommerceEngine<
  TControllerDefinitions extends ControllerDefinitionsMap<
    SSRCommerceEngine,
    Controller
  >,
>(
  options: CommerceEngineDefinitionOptions<TControllerDefinitions>
): MultiSolutionTypeCommerceEngineDefinition<TControllerDefinitions> {
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

  const getOpts = () => {
    return engineOptions;
  };

  const buildFactory =
    (solutionType: SolutionType) =>
    async (...[buildOptions]: BuildParameters) => {
      const engine = buildSSRCommerceEngine(
        solutionType,
        buildOptions?.extend ? await buildOptions.extend(getOpts()) : getOpts()
      );
      const controllers = buildControllerDefinitions({
        definitionsMap: (controllerDefinitions ?? {}) as TControllerDefinitions,
        engine,
        solutionType,
        propsMap: (buildOptions && 'controllers' in buildOptions
          ? buildOptions.controllers
          : {}) as InferControllerPropsMapFromDefinitions<TControllerDefinitions>,
      });

      return {
        engine,
        controllers,
      };
    };

  const fetchStaticStateFactory: (
    solutionType: SolutionType
  ) => FetchStaticStateFunction = (solutionType: SolutionType) =>
    composeFunction(
      async (...params: FetchStaticStateParameters) => {
        const buildResult = await buildFactory(solutionType)(...params);
        const staticState = await fetchStaticStateFactory(
          solutionType
        ).fromBuildResult({
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

          // if (solutionType === SolutionType.Listing) {
          if (solutionType === 'listing') {
            buildProductListing(engine).executeFirstRequest();
          } else {
            buildSearch(engine).executeFirstSearch();
          }

          return createStaticState({
            searchAction: await engine.waitForRequestCompletedAction(),
            controllers,
          });
        },
      }
    );

  const hydrateStaticStateFactory: (
    solutionType: SolutionType
  ) => HydrateStaticStateFunction = (solutionType: SolutionType) =>
    composeFunction(
      async (...params: HydrateStaticStateParameters) => {
        const buildResult = await buildFactory('listing')(
          ...(params as BuildParameters)
        );
        const staticState = await hydrateStaticStateFactory(
          solutionType
        ).fromBuildResult({
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
          await engine.waitForRequestCompletedAction();
          return {engine, controllers};
        },
      }
    );

  return {
    ListingSSR: {
      build: buildFactory('listing'),
      fetchStaticState: fetchStaticStateFactory('listing'),
      hydrateStaticState: hydrateStaticStateFactory('listing'),
    },
    SearchSSR: {
      build: buildFactory('listing'),
      fetchStaticState: fetchStaticStateFactory('listing'),
      hydrateStaticState: hydrateStaticStateFactory('listing'),
      //   build: buildFactory(SolutionType.Listing),
      //   fetchStaticState: fetchStaticStateFactory(SolutionType.Listing),
      //   hydrateStaticState: hydrateStaticStateFactory(SolutionType.Listing),
      // },
      // SearchSSR: {
      //   build: buildFactory(SolutionType.Search),
      //   fetchStaticState: fetchStaticStateFactory(SolutionType.Search),
      //   hydrateStaticState: hydrateStaticStateFactory(SolutionType.Search),
    },
  };
}

const configuration = {
  ...getSampleCommerceEngineConfiguration(),
  analytics: {
    trackingId: 'sports',
    enabled: false, // TODO: setup navigatorContext
  },
};

type CommerceEngineConfig = CommerceEngineDefinitionOptions<
  ControllerDefinitionsMap<CommerceEngine, Controller>
>;

export const masterEngineConfig = {
  configuration: configuration,
  controllers: {
    // standaloneSearchBox: defineStandaloneSearchBox(),
    summary: defineQuerySummary(), // TODO: only case that does not work
    facets: defineFacets(),
  },
} satisfies CommerceEngineConfig;
const engineDefinition = defineCommerceEngine(masterEngineConfig);

export const {ListingSSR, SearchSSR} = engineDefinition;
ListingSSR.hydrateStaticState({
  searchAction: 'null' as unknown as AnyAction,
}).then((state) => {
  state.controllers;
});
