'use client';

import {
  buildSSRCommerceSearchParameterSerializer,
  CommerceSearchParameters,
  ParameterManager,
  ParameterManagerState,
  Parameters,
} from '@coveo/headless/ssr-commerce';
import {useEffect, useMemo, useState} from 'react';
import {useAppHistoryRouter} from './history-router';

interface IUseSyncParameterManagerProps {
  staticState:
    | ParameterManagerState<CommerceSearchParameters>
    | ParameterManagerState<Parameters>;
  controller?:
    | ParameterManager<CommerceSearchParameters>
    | ParameterManager<Parameters>;
}

export default function useSyncParameterManager(
  props: IUseSyncParameterManagerProps
) {
  const historyRouter = useAppHistoryRouter();

  const {staticState, controller} = props;
  const [state, setState] = useState(staticState);

  useEffect(() => {
    controller?.subscribe(() => setState(controller.state));
  }, [controller]);

  useEffect(() => {
    if (!controller || !historyRouter.url?.searchParams) {
      return;
    }
    const {toCommerceSearchParameters} =
      buildSSRCommerceSearchParameterSerializer();
    const searchParameters = toCommerceSearchParameters(
      historyRouter.url.searchParams
    );
    return controller.synchronize(searchParameters);
  }, [historyRouter.url?.searchParams, controller]);

  const correctedUrl = useMemo(() => {
    if (!historyRouter.url) {
      return null;
    }
    const newURL = new URL(historyRouter.url);
    const {serialize} = buildSSRCommerceSearchParameterSerializer();

    return serialize(state.parameters, newURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.parameters]);

  useEffect(() => {
    if (!correctedUrl || document.location.href === correctedUrl) {
      return;
    }

    const {pathname} = new URL(correctedUrl);
    if (pathname !== document.location.pathname) {
      return;
    }
    const isStaticState = controller === undefined;

    historyRouter[isStaticState ? 'replace' : 'push'](correctedUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller, correctedUrl]);
}
