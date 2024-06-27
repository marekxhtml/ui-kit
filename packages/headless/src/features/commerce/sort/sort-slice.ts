import {type Draft as WritableDraft} from '@reduxjs/toolkit';
import {AnyAction, createReducer} from '@reduxjs/toolkit';
import {SortOption} from '../../../api/commerce/common/sort';
import {
  buildRelevanceSortCriterion,
  SortBy,
  SortCriterion,
} from '../../sort/sort';
import {setContext, setView} from '../context/context-actions';
import {Parameters} from '../parameters/parameters-actions';
import {restoreProductListingParameters} from '../product-listing-parameters/product-listing-parameters-actions';
import {fetchProductListing} from '../product-listing/product-listing-actions';
import {restoreSearchParameters} from '../search-parameters/search-parameters-actions';
import {executeSearch} from '../search/search-actions';
import {applySort} from './sort-actions';
import {CommerceSortState, getCommerceSortInitialState} from './sort-state';

export const sortReducer = createReducer(
  getCommerceSortInitialState(),

  (builder) => {
    builder
      .addCase(applySort, (state, action) => {
        state.appliedSort = action.payload;
      })
      .addCase(fetchProductListing.fulfilled, handleFetchFulfilled)
      .addCase(executeSearch.fulfilled, handleFetchFulfilled)
      .addCase(restoreSearchParameters, handleRestoreParameters)
      .addCase(restoreProductListingParameters, handleRestoreParameters)
      .addCase(setContext, getCommerceSortInitialState)
      .addCase(setView, getCommerceSortInitialState);
  }
);

function handleFetchFulfilled(
  state: WritableDraft<CommerceSortState>,
  action: AnyAction
) {
  const response = action.payload.response;
  state.appliedSort = mapResponseSortToStateSort(response.sort.appliedSort);
  state.availableSorts = response.sort.availableSorts.map(
    mapResponseSortToStateSort
  );
}

const mapResponseSortToStateSort = (sort: SortOption): SortCriterion => {
  if (sort.sortCriteria === SortBy.Relevance) {
    return buildRelevanceSortCriterion();
  }

  return {
    by: SortBy.Fields,
    fields: (sort.fields || []).map(({field, direction, displayName}) => ({
      name: field,
      direction,
      displayName,
    })),
  };
};

function handleRestoreParameters(
  state: WritableDraft<CommerceSortState>,
  action: {payload: Parameters}
) {
  if (action.payload.sortCriteria) {
    state.appliedSort = action.payload.sortCriteria;
  }
}
