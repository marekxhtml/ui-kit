import {PayloadAction} from '@reduxjs/toolkit';
import {CommerceEngine} from '../../../app/commerce-engine/commerce-engine';
import {facetOrderReducer as facetOrder} from '../../facets/facet-order/facet-order-slice';
import {commerceFacetSetReducer as commerceFacetSet} from '../facets/facet-set/facet-set-slice';
import {paginationReducer as commercePagination} from '../pagination/pagination-slice';
import {sortReducer as commerceSort} from '../sort/sort-slice';
import {
  RestoreProductListingParametersPayload,
  restoreProductListingParameters,
} from './product-listing-parameters-actions';

export type {RestoreProductListingParametersPayload};

/**
 * The product listing parameters action creators.
 */
export interface ProductListingParametersActionCreators {
  /**
   * Restores the product listing parameters.
   *
   * @param payload - The action creator payload.
   * @returns A dispatchable action.
   */
  restoreProductListingParameters(
    payload: RestoreProductListingParametersPayload
  ): PayloadAction<RestoreProductListingParametersPayload>;
}

/**
 * Loads the commerce facet order, facet set, pagination, and sort reducers and returns the available product listing parameters action creators.
 *
 * @param engine - The headless commerce engine.
<<<<<<< HEAD
 * @returns An object holding the action creators.
=======
 * @returns An object holding the product listing parameters action creators.
>>>>>>> ce6fb7ee5e23f10840b4cc654544e7dde05d80d2
 */
export function loadProductListingParametersActions(
  engine: CommerceEngine
): ProductListingParametersActionCreators {
  engine.addReducers({
    facetOrder,
    commerceFacetSet,
    commercePagination,
    commerceSort,
  });

  return {
    restoreProductListingParameters,
  };
}
