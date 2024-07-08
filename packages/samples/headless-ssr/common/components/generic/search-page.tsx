'use client';

import {useEffect, useState} from 'react';
// import {useSyncSearchParameterManager} from '../../hooks/generic/search-parameter-manager';
import {
  SearchStaticState,
  SearchHydratedState,
  hydrateStaticState,
} from '../../lib/generic/commerce-search-engine';
import {HydrationMetadata} from '../common/hydration-metadata';
import {ProductList} from './product-list';
import {SearchBox} from './search-box';
import {Summary} from './summary';

export default function SearchPage({
  staticState,
}: {
  staticState: SearchStaticState;
}) {
  const [hydratedState, setHydratedState] = useState<
    SearchHydratedState | undefined
  >(undefined);

  useEffect(() => {
    const {context} = staticState.controllers;
    hydrateStaticState({
      searchAction: staticState.searchAction,
      controllers: {
        context: {
          options: context.state,
        },
        // searchParameterManager: {
        //   initialState: searchParameterManager.state,
        // },
      },
    }).then(({engine, controllers}) => {
      setHydratedState({engine, controllers});
      // controllers.search.executeFirstSearch(); // FIXME: this will trigger 2 queries because React strict mode
    });
  }, [staticState]);

  /**
   * This hook is used to synchronize the URL with the state of the search interface.
   */
  // useSyncSearchParameterManager({
  //   staticState: staticState.controllers.searchParameterManager.state,
  //   controller: hydratedState?.controllers.searchParameterManager,
  // });
  return (
    <>
      <SearchBox
        staticState={staticState.controllers.searchBox.state}
        controller={hydratedState?.controllers.searchBox}
      />
      <Summary
        staticState={staticState.controllers.summary.state}
        controller={hydratedState?.controllers.summary}
      />
      {/* TODO: does not work because it has to be built using buildSearch and not buildProductListing */}
      {/* <FacetGenerator
        staticState={staticState.controllers.} // TODO: the facet generator state is useless
        controller={hydratedState?.controllers.facets}
      /> */}
      <HydrationMetadata
        staticState={staticState.controllers.summary.state}
        searchOrListingHydratedState={hydratedState}
      />
      <ProductList
        staticState={staticState.controllers.search.state}
        controller={hydratedState?.controllers.search}
      />
    </>
  );
}
