import {Relay} from '@coveo/relay';
import pino, {Logger} from 'pino';
import {CaseAssistEngine} from '../app/case-assist-engine/case-assist-engine';
import {CommerceEngine} from '../app/commerce-engine/commerce-engine';
import {SSRCommerceEngine} from '../app/commerce-engine/commerce-engine.ssr';
import type {CoreEngine, CoreEngineNext} from '../app/engine';
import {InsightEngine} from '../app/insight-engine/insight-engine';
import {defaultNodeJSNavigatorContextProvider} from '../app/navigatorContextProvider';
import {RecommendationEngine} from '../app/recommendation-engine/recommendation-engine';
import {SearchEngine} from '../app/search-engine/search-engine';
import {SSRSearchEngine} from '../app/search-engine/search-engine.ssr';
import {stateKey} from '../app/state-key';

type SpyEverything<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? jest.Mock<R, A>
    : T[K] extends object
      ? SpyEverything<T[K]>
      : T[K];
};

type SpiedLoggerProps = SpyEverything<
  Pick<Logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>
>;

type MockedLogger = Logger & SpiedLoggerProps;

function mockLogger(logger: Logger): MockedLogger {
  return Object.assign<Logger, SpiedLoggerProps>(logger, {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    fatal: jest.fn(),
  });
}

type MockedRelay = Relay & Pick<Relay, 'emit'>;

export function mockRelay(): MockedRelay {
  return {
    emit: jest.fn(),
    getMeta: jest.fn().mockReturnValue({clientId: 'test'}),
    off: jest.fn(),
    on: jest.fn(),
    updateConfig: jest.fn(),
    version: 'test',
  };
}

type MockedCoreEngine<
  State extends StateFromEngine<CoreEngine> = StateFromEngine<CoreEngine>,
> = CoreEngine & {
  state: State;
  logger: MockedLogger;
  relay: MockedRelay;
} & SpyEverything<Omit<CoreEngine, 'logger' | 'state' | 'relay'>>;

export function buildMockCoreEngine<State extends StateFromEngine<CoreEngine>>(
  initialState: State
): MockedCoreEngine<State> {
  const state: State = initialState;
  return {
    state,
    dispatch: jest.fn(),
    addReducers: jest.fn(),
    disableAnalytics: jest.fn(),
    enableAnalytics: jest.fn(),
    logger: mockLogger(pino({level: 'silent'})),
    relay: mockRelay(),
    store: {
      dispatch: jest.fn(),
      getState: jest.fn(),
      replaceReducer: jest.fn(),
      subscribe: jest.fn(),
      [Symbol.observable]: jest.fn(),
    },
    subscribe: jest.fn(),
    navigatorContext: defaultNodeJSNavigatorContextProvider(),
  };
}

type MockedCoreEngineNext<
  State extends
    StateFromEngineNext<CoreEngineNext> = StateFromEngineNext<CoreEngineNext>,
> = CoreEngineNext & {
  [stateKey]: State;
  logger: MockedLogger;
  relay: MockedRelay;
} & SpyEverything<Omit<CoreEngineNext, 'logger' | 'stateKey' | 'relay'>>;

export function buildMockCoreEngineNext<
  State extends StateFromEngineNext<CoreEngineNext>,
>(initialState: State): MockedCoreEngineNext<State> {
  const state: State = initialState;
  return {
    [stateKey]: state,
    configuration: state.configuration,
    dispatch: jest.fn(),
    addReducers: jest.fn(),
    disableAnalytics: jest.fn(),
    enableAnalytics: jest.fn(),
    logger: mockLogger(pino({level: 'silent'})),
    relay: mockRelay(),
    subscribe: jest.fn(),
    navigatorContext: defaultNodeJSNavigatorContextProvider(),
  };
}

export type MockedSearchEngine = SearchEngine &
  MockedCoreEngine<StateFromEngine<SearchEngine>> &
  SpyEverything<
    Pick<
      SearchEngine,
      | 'executeFirstSearch'
      | 'executeFirstSearchAfterStandaloneSearchBoxRedirect'
    >
  >;

export type MockedCaseAssistEngine = CaseAssistEngine;
export type MockedRecommendationEngine = RecommendationEngine;
export type MockedCommerceEngine = CommerceEngine;
export type MockedInsightEngine = InsightEngine;

type StateFromEngine<TEngine extends CoreEngine> = TEngine['state'];

type StateFromEngineNext<TEngine extends CoreEngineNext> =
  TEngine[typeof stateKey];

export function buildMockSearchEngine(
  initialState: StateFromEngine<SearchEngine>
): MockedSearchEngine {
  return {
    ...buildMockCoreEngine(initialState),
    executeFirstSearch: jest.fn(),
    executeFirstSearchAfterStandaloneSearchBoxRedirect: jest.fn(),
  };
}

export function buildMockCaseAssistEngine<
  State extends StateFromEngine<CaseAssistEngine>,
>(initialState: State): CaseAssistEngine {
  return {
    ...buildMockCoreEngine<State>(initialState),
  };
}

export function buildMockCommerceEngine<
  State extends StateFromEngineNext<CommerceEngine>,
>(initialState: State): CommerceEngine {
  return {
    ...buildMockCoreEngineNext(initialState),
    configuration: {
      ...initialState.configuration,
    },
  };
}

export function buildMockInsightEngine<
  State extends StateFromEngine<InsightEngine>,
>(initialState: State): InsightEngine {
  return {
    ...buildMockCoreEngine(initialState),
    executeFirstSearch: jest.fn(),
  };
}

export function buildMockRecommendationEngine<
  State extends StateFromEngine<RecommendationEngine>,
>(initialState: State): RecommendationEngine {
  return {
    ...buildMockCoreEngine(initialState),
  };
}

export function buildMockSSRSearchEngine(
  initialState: StateFromEngine<SearchEngine>
): SSRSearchEngine {
  const engine = buildMockSearchEngine(initialState);
  return {
    ...engine,
    waitForSearchCompletedAction: jest.fn(),
  };
}

export function buildMockSSRCommerceEngine(
  initialState: StateFromEngineNext<CommerceEngine>
): SSRCommerceEngine {
  const engine = buildMockCommerceEngine(initialState);
  return {
    ...engine,
    waitForRequestCompletedAction: jest.fn(),
  };
}
