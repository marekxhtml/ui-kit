import {NumberValue, BooleanValue, RecordValue} from '@coveo/bueno';
import {requiredNonEmptyString} from '../../../../utils/validate-payload';
import {facetIdDefinition} from '../../generic/facet-actions-validation';
import {RangeFacetValue} from './interfaces/range-facet';

export const numericFacetValueDefinition = {
  state: requiredNonEmptyString,
  start: new NumberValue({required: true}),
  end: new NumberValue({required: true}),
  endInclusive: new BooleanValue({required: true}),
  numberOfResults: new NumberValue({required: true, min: 0}),
};

export const dateFacetValueDefinition = {
  start: requiredNonEmptyString,
  end: requiredNonEmptyString,
  endInclusive: new BooleanValue({required: true}),
  state: requiredNonEmptyString,
  numberOfResults: new NumberValue({required: true, min: 0}),
};

export const rangeFacetSelectionPayloadDefinition = (
  selection: RangeFacetValue
) => ({
  facetId: facetIdDefinition,
  selection:
    typeof selection.start === 'string'
      ? new RecordValue({values: dateFacetValueDefinition})
      : new RecordValue({values: numericFacetValueDefinition}),
});

export interface RangeFacetSelectionPayload {
  facetId: string;
  selection: RangeFacetValue;
}
