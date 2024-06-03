import {CommerceEngine} from '../../../../../app/commerce-engine/commerce-engine';
import {
  toggleExcludeDateFacetValue,
  toggleSelectDateFacetValue,
  updateDateFacetValues,
} from '../../../../../features/facets/range-facets/date-facet-set/date-facet-actions';
import {buildDateRange} from '../../../../core/facets/range-facet/date-facet/date-range';
import {
  CoreCommerceFacet,
  CoreCommerceFacetOptions,
  CoreCommerceFacetState,
  DateFacetValue,
  DateRangeRequest,
  FacetControllerType,
  buildCoreCommerceFacet,
} from '../headless-core-commerce-facet';

export type DateFacetOptions = Omit<
  CoreCommerceFacetOptions,
  'toggleSelectActionCreator' | 'toggleExcludeActionCreator'
>;

export type DateFacetState = CoreCommerceFacetState<DateFacetValue>;

/**
 * The `DateFacet` controller offers a high-level programming interface for implementing date commerce
 * facet UI component.
 */
export type DateFacet = CoreCommerceFacet<DateRangeRequest, DateFacetValue> & {
  /**
   * Replaces the current range values with the specified ones.
   *
   * @param ranges - The new ranges to set.
   */
  setRanges: (ranges: DateRangeRequest[]) => void;
  /**
   * The state of the `DateFacet` controller.
   */
  state: DateFacetState;
} & FacetControllerType<'dateRange'>;

export {buildDateRange};

/**
 * @internal
 *
 * **Important:** This initializer is meant for internal use by headless only.
 * As an implementer, you must not import or use this initializer directly in your code.
 * You will instead interact with `DateFacet` controller instances through the state of a `FacetGenerator`
 * controller.
 *
 * @param engine - The headless commerce engine.
 * @param options - The `DateFacet` options used internally.
 * @returns A `DateFacet` controller instance.
 */
export function buildCommerceDateFacet(
  engine: CommerceEngine,
  options: DateFacetOptions
): DateFacet {
  const coreController = buildCoreCommerceFacet<
    DateRangeRequest,
    DateFacetValue
  >(engine, {
    options: {
      ...options,
      toggleSelectActionCreator: toggleSelectDateFacetValue,
      toggleExcludeActionCreator: toggleExcludeDateFacetValue,
    },
  });

  const {dispatch} = engine;
  const {facetId, fetchProductsActionCreator: fetchProductsActionCreator} =
    options;

  return {
    ...coreController,

    setRanges(ranges: DateRangeRequest[]) {
      dispatch(
        updateDateFacetValues({
          facetId,
          values: ranges.map((range) => ({...range, numberOfResults: 0})),
        })
      );
      dispatch(fetchProductsActionCreator());
    },

    get state() {
      return coreController.state;
    },

    type: 'dateRange',
  };
}
