import type {AnalyticsClientSendEventHook} from 'coveo.analytics';
import type {Logger} from 'pino';
import HistoryStore from '../../utils/coveo.analytics-light/history.js';
import {clone} from '../../utils/utils.js';
import type {PreprocessRequest} from '../preprocess-request.js';

export const historyStore = new HistoryStore();

export const wrapPreprocessRequest = (
  logger: Logger,
  preprocessRequest?: PreprocessRequest
) => {
  return typeof preprocessRequest === 'function'
    ? (...args: Parameters<PreprocessRequest>) => {
        const untaintedOutput = clone(args[0]);
        try {
          return preprocessRequest.apply(preprocessRequest, args);
        } catch (e) {
          logger.error(
            e as Error,
            'Error in analytics preprocessRequest. Returning original request.'
          );
          return untaintedOutput;
        }
      }
    : undefined;
};

export const wrapAnalyticsClientSendEventHook = (
  logger: Logger,
  hook: AnalyticsClientSendEventHook
) => {
  return (...args: Parameters<AnalyticsClientSendEventHook>) => {
    const untaintedOutput = clone(args[1]);
    try {
      return hook.apply(hook, args);
    } catch (e) {
      logger.error(
        e as Error,
        'Error in analytics hook. Returning original request.'
      );
      return untaintedOutput;
    }
  };
};
