import {isArray} from '../../../utils/utils.js';
import {
  castUnknownObject,
  delimiter,
  isFacetObject,
  isObject,
  isRangeFacetKey,
  isRangeFacetObject,
  preprocessObjectPairs,
  SearchParameterKey,
  serialize as coreSerialize,
  serializeFacets,
  serializeRangeFacets,
  serializeSpecialCharacters,
  splitOnFirstEqual,
} from '../../search-parameters/search-parameter-serializer.js';
import {ProductListingParameters} from '../product-listing-parameters/product-listing-parameters-actions.js';
import {CommerceSearchParameters} from '../search-parameters/search-parameters-actions.js';
import {
  buildFieldsSortCriterion,
  buildRelevanceSortCriterion,
  SortBy,
  SortCriterion,
  SortDirection,
} from '../sort/sort.js';
import {Parameters} from './parameters-actions.js';

const sortFieldAndDirectionSeparator = ' ';
const sortFieldsJoiner = ',';
export const commerceFacetsRegex =
  /^(f|fExcluded|cf|nf|nfExcluded|df|dfExcluded|mnf|mnfExcluded|lf)-(.+)$/;

export interface Serializer<T extends Parameters> {
  serialize: (parameters: T) => string;
  deserialize: (fragment: string) => T;
}

export const searchSerializer: Serializer<CommerceSearchParameters> = {
  serialize,
  deserialize,
};

export const productListingSerializer = {
  serialize,
  deserialize,
} as Serializer<ProductListingParameters>;

export type ParametersKey = keyof CommerceSearchParameters;
export type FacetParameters = keyof Pick<
  Parameters,
  | 'f'
  | 'fExcluded'
  | 'lf'
  | 'cf'
  | 'nf'
  | 'nfExcluded'
  | 'df'
  | 'dfExcluded'
  | 'mnf'
  | 'mnfExcluded'
>;

type FacetKey = keyof typeof supportedFacetParameters;
const supportedFacetParameters: Record<FacetParameters, boolean> = {
  f: true,
  fExcluded: true,
  lf: true,
  cf: true,
  nf: true,
  nfExcluded: true,
  df: true,
  dfExcluded: true,
  mnf: true,
  mnfExcluded: true,
};

function serialize(parameters: CommerceSearchParameters): string {
  return coreSerialize(serializePair)(parameters);
}

function serializePair(pair: [string, unknown]) {
  const [key, val] = pair;

  if (!isValidKey(key)) {
    return '';
  }

  if (key === 'sortCriteria') {
    return isSortCriteriaObject(val) ? serializeSortCriteria(key, val) : '';
  }

  if (keyHasObjectValue(key) && !isRangeFacetKey(key)) {
    return isFacetObject(val) ? serializeFacets(key, val) : '';
  }

  if (key === 'nf' || key === 'df' || key === 'mnf') {
    return isRangeFacetObject(val) ? serializeRangeFacets(key, val) : '';
  }

  if (val !== undefined) {
    return serializeSpecialCharacters(key, val);
  }

  return '';
}

function serializeSortCriteria(key: string, val: SortCriterion | undefined) {
  return serializeSpecialCharacters(key, buildCriterionExpression(val));
}

export function buildCriterionExpression(criterion: SortCriterion | undefined) {
  if (!criterion) {
    return '';
  }

  if (criterion.by === SortBy.Relevance) {
    return 'relevance';
  }

  return criterion.fields
    .map(
      (field) =>
        `${field.name}${sortFieldAndDirectionSeparator}${field.direction}`
    )
    .join(sortFieldsJoiner);
}

function isValidKey(key: string): key is ParametersKey {
  return isValidBasicKey(key) || keyHasObjectValue(key);
}

function isSortCriteriaObject(obj: unknown): obj is SortCriterion | undefined {
  if (!isObject(obj) || !('by' in obj)) {
    return false;
  }

  if (obj.by === 'relevance') {
    return true;
  }

  if (obj.by === 'fields' && 'fields' in obj && isArray(obj.fields)) {
    return obj.fields.every((field) => {
      return (
        isObject(field) &&
        'name' in field &&
        typeof field.name === 'string' &&
        (('direction' in field &&
          (field.direction === SortDirection.Ascending ||
            field.direction === SortDirection.Descending)) ||
          !('direction' in field))
      );
    });
  }

  return false;
}

export function isValidBasicKey(
  key: string
): key is Exclude<SearchParameterKey, FacetKey> {
  const supportedBasicParameters: Record<
    Exclude<keyof CommerceSearchParameters, FacetParameters>,
    boolean
  > = {
    q: true,
    sortCriteria: true,
    page: true,
    perPage: true,
  };
  return key in supportedBasicParameters;
}

function deserialize<T extends Parameters>(fragment: string): T {
  const parts = fragment.split(delimiter);
  const keyValuePairs = parts
    .map(splitOnFirstEqual)
    .map((parts) => preprocessObjectPairs(parts, commerceFacetsRegex))
    .filter(isValidPair)
    .map(cast);

  return keyValuePairs.reduce((acc: Partial<T>, pair) => {
    const [key, val] = pair;

    if (keyHasObjectValue(key)) {
      const mergedValues = {...acc[key], ...(val as object)};
      return {...acc, [key]: mergedValues};
    }

    if (key === 'sortCriteria') {
      const sortCriteria = deserializeSortCriteria(val as string);
      return {...acc, [key]: sortCriteria};
    }

    return {...acc, [key]: val};
  }, {}) as T;
}

export function keyHasObjectValue(key: string): key is FacetKey {
  return key in supportedFacetParameters;
}

function isValidPair<K extends keyof Parameters>(
  pair: string[]
): pair is [K, string] {
  const validKey = isValidKey(pair[0]);
  const lengthOfTwo = pair.length === 2;
  return validKey && lengthOfTwo;
}

function cast<K extends keyof Parameters>(pair: [K, string]): [K, unknown] {
  const [key, value] = pair;

  if (key === 'page' || key === 'perPage') {
    return [key, parseInt(value)];
  }

  if (keyHasObjectValue(key)) {
    return [key, castUnknownObject(value)];
  }

  return [key, decodeURIComponent(value)];
}

export function deserializeSortCriteria(
  value: string
): SortCriterion | undefined {
  if (value === 'relevance') {
    return buildRelevanceSortCriterion();
  }

  const criteria = value.split(sortFieldsJoiner);
  if (!criteria.length) {
    return undefined;
  }

  return criteria.reduce((acc, joinedFieldAndDirection) => {
    const fieldAndDirection = joinedFieldAndDirection
      .trim()
      .split(sortFieldAndDirectionSeparator);

    if (fieldAndDirection.length !== 2) {
      return acc;
    }

    const field = fieldAndDirection[0].toLowerCase();
    const direction = fieldAndDirection[1].toLowerCase();

    return {
      ...acc,
      fields: [
        ...acc.fields,
        {name: field, direction: direction as SortDirection},
      ],
    };
  }, buildFieldsSortCriterion([]));
}
