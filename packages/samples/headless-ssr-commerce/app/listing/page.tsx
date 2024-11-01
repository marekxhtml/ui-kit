import {buildSSRCommerceSearchParameterSerializer} from '@coveo/headless/ssr-commerce';
import {headers} from 'next/headers';
import ListingPage from '../_components/pages/listing-page';
import {listingEngineDefinition} from '../_lib/commerce-engine';
import {NextJsNavigatorContext} from '../_lib/navigatorContextProvider';

interface IListingProps {
  searchParams: URLSearchParams;
}

/**
 * This file defines a List component that uses the Coveo Headless SSR commerce library to manage its state.
 *
 * The Listing function is the entry point for server-side rendering (SSR).
 */
export default async function Listing(props: IListingProps) {
  // Sets the navigator context provider to use the newly created `navigatorContext` before fetching the app static state
  const navigatorContext = new NextJsNavigatorContext(headers());
  listingEngineDefinition.setNavigatorContextProvider(() => navigatorContext);

  const {toCommerceSearchParameters} =
    buildSSRCommerceSearchParameterSerializer();
  const parameters = toCommerceSearchParameters(props.searchParams);

  // Fetches the static state of the app with initial state (when applicable)
  const staticState = await listingEngineDefinition.fetchStaticState({
    controllers: {
      searchParameterManager: {initialState: {parameters}},
    },
  });

  return (
    <ListingPage
      staticState={staticState}
      navigatorContext={navigatorContext.marshal}
    ></ListingPage>
  );
}

export const dynamic = 'force-dynamic';
