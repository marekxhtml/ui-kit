'use client';

/**
 * This file was automatically generated by the Stencil React Output Target.
 * Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
 */

/* eslint-disable */

import { type AtomicCommerceSearchBoxCustomEvent, type AtomicProductChildrenCustomEvent, type RedirectionPayload, type SelectChildProductEventArgs } from "@coveo/atomic";
import { AtomicCommerceBreadbox as AtomicCommerceBreadboxElement, defineCustomElement as defineAtomicCommerceBreadbox } from "@coveo/atomic/components/atomic-commerce-breadbox.js";
import { AtomicCommerceCategoryFacet as AtomicCommerceCategoryFacetElement, defineCustomElement as defineAtomicCommerceCategoryFacet } from "@coveo/atomic/components/atomic-commerce-category-facet.js";
import { AtomicCommerceDidYouMean as AtomicCommerceDidYouMeanElement, defineCustomElement as defineAtomicCommerceDidYouMean } from "@coveo/atomic/components/atomic-commerce-did-you-mean.js";
import { AtomicCommerceFacetNumberInput as AtomicCommerceFacetNumberInputElement, defineCustomElement as defineAtomicCommerceFacetNumberInput } from "@coveo/atomic/components/atomic-commerce-facet-number-input.js";
import { AtomicCommerceFacet as AtomicCommerceFacetElement, defineCustomElement as defineAtomicCommerceFacet } from "@coveo/atomic/components/atomic-commerce-facet.js";
import { AtomicCommerceFacets as AtomicCommerceFacetsElement, defineCustomElement as defineAtomicCommerceFacets } from "@coveo/atomic/components/atomic-commerce-facets.js";
import { AtomicCommerceInterface as AtomicCommerceInterfaceElement, defineCustomElement as defineAtomicCommerceInterface } from "@coveo/atomic/components/atomic-commerce-interface.js";
import { AtomicCommerceLayout as AtomicCommerceLayoutElement, defineCustomElement as defineAtomicCommerceLayout } from "@coveo/atomic/components/atomic-commerce-layout.js";
import { AtomicCommerceLoadMoreProducts as AtomicCommerceLoadMoreProductsElement, defineCustomElement as defineAtomicCommerceLoadMoreProducts } from "@coveo/atomic/components/atomic-commerce-load-more-products.js";
import { AtomicCommerceNoProducts as AtomicCommerceNoProductsElement, defineCustomElement as defineAtomicCommerceNoProducts } from "@coveo/atomic/components/atomic-commerce-no-products.js";
import { AtomicCommerceNumericFacet as AtomicCommerceNumericFacetElement, defineCustomElement as defineAtomicCommerceNumericFacet } from "@coveo/atomic/components/atomic-commerce-numeric-facet.js";
import { AtomicCommercePager as AtomicCommercePagerElement, defineCustomElement as defineAtomicCommercePager } from "@coveo/atomic/components/atomic-commerce-pager.js";
import { AtomicCommerceProductList as AtomicCommerceProductListElement, defineCustomElement as defineAtomicCommerceProductList } from "@coveo/atomic/components/atomic-commerce-product-list.js";
import { AtomicCommerceProductsPerPage as AtomicCommerceProductsPerPageElement, defineCustomElement as defineAtomicCommerceProductsPerPage } from "@coveo/atomic/components/atomic-commerce-products-per-page.js";
import { AtomicCommerceQueryError as AtomicCommerceQueryErrorElement, defineCustomElement as defineAtomicCommerceQueryError } from "@coveo/atomic/components/atomic-commerce-query-error.js";
import { AtomicCommerceQuerySummary as AtomicCommerceQuerySummaryElement, defineCustomElement as defineAtomicCommerceQuerySummary } from "@coveo/atomic/components/atomic-commerce-query-summary.js";
import { AtomicCommerceRecommendationInterface as AtomicCommerceRecommendationInterfaceElement, defineCustomElement as defineAtomicCommerceRecommendationInterface } from "@coveo/atomic/components/atomic-commerce-recommendation-interface.js";
import { AtomicCommerceRecommendationList as AtomicCommerceRecommendationListElement, defineCustomElement as defineAtomicCommerceRecommendationList } from "@coveo/atomic/components/atomic-commerce-recommendation-list.js";
import { AtomicCommerceRefineModal as AtomicCommerceRefineModalElement, defineCustomElement as defineAtomicCommerceRefineModal } from "@coveo/atomic/components/atomic-commerce-refine-modal.js";
import { AtomicCommerceRefineToggle as AtomicCommerceRefineToggleElement, defineCustomElement as defineAtomicCommerceRefineToggle } from "@coveo/atomic/components/atomic-commerce-refine-toggle.js";
import { AtomicCommerceSearchBoxInstantProducts as AtomicCommerceSearchBoxInstantProductsElement, defineCustomElement as defineAtomicCommerceSearchBoxInstantProducts } from "@coveo/atomic/components/atomic-commerce-search-box-instant-products.js";
import { AtomicCommerceSearchBoxQuerySuggestions as AtomicCommerceSearchBoxQuerySuggestionsElement, defineCustomElement as defineAtomicCommerceSearchBoxQuerySuggestions } from "@coveo/atomic/components/atomic-commerce-search-box-query-suggestions.js";
import { AtomicCommerceSearchBoxRecentQueries as AtomicCommerceSearchBoxRecentQueriesElement, defineCustomElement as defineAtomicCommerceSearchBoxRecentQueries } from "@coveo/atomic/components/atomic-commerce-search-box-recent-queries.js";
import { AtomicCommerceSearchBox as AtomicCommerceSearchBoxElement, defineCustomElement as defineAtomicCommerceSearchBox } from "@coveo/atomic/components/atomic-commerce-search-box.js";
import { AtomicCommerceSortDropdown as AtomicCommerceSortDropdownElement, defineCustomElement as defineAtomicCommerceSortDropdown } from "@coveo/atomic/components/atomic-commerce-sort-dropdown.js";
import { AtomicCommerceText as AtomicCommerceTextElement, defineCustomElement as defineAtomicCommerceText } from "@coveo/atomic/components/atomic-commerce-text.js";
import { AtomicCommerceTimeframeFacet as AtomicCommerceTimeframeFacetElement, defineCustomElement as defineAtomicCommerceTimeframeFacet } from "@coveo/atomic/components/atomic-commerce-timeframe-facet.js";
import { AtomicIcon as AtomicIconElement, defineCustomElement as defineAtomicIcon } from "@coveo/atomic/components/atomic-icon.js";
import { AtomicLayoutSection as AtomicLayoutSectionElement, defineCustomElement as defineAtomicLayoutSection } from "@coveo/atomic/components/atomic-layout-section.js";
import { AtomicNumericRange as AtomicNumericRangeElement, defineCustomElement as defineAtomicNumericRange } from "@coveo/atomic/components/atomic-numeric-range.js";
import { AtomicProductChildren as AtomicProductChildrenElement, defineCustomElement as defineAtomicProductChildren } from "@coveo/atomic/components/atomic-product-children.js";
import { AtomicProductDescription as AtomicProductDescriptionElement, defineCustomElement as defineAtomicProductDescription } from "@coveo/atomic/components/atomic-product-description.js";
import { AtomicProductFieldCondition as AtomicProductFieldConditionElement, defineCustomElement as defineAtomicProductFieldCondition } from "@coveo/atomic/components/atomic-product-field-condition.js";
import { AtomicProductImage as AtomicProductImageElement, defineCustomElement as defineAtomicProductImage } from "@coveo/atomic/components/atomic-product-image.js";
import { AtomicProductLink as AtomicProductLinkElement, defineCustomElement as defineAtomicProductLink } from "@coveo/atomic/components/atomic-product-link.js";
import { AtomicProductNumericFieldValue as AtomicProductNumericFieldValueElement, defineCustomElement as defineAtomicProductNumericFieldValue } from "@coveo/atomic/components/atomic-product-numeric-field-value.js";
import { AtomicProductPrice as AtomicProductPriceElement, defineCustomElement as defineAtomicProductPrice } from "@coveo/atomic/components/atomic-product-price.js";
import { AtomicProductRating as AtomicProductRatingElement, defineCustomElement as defineAtomicProductRating } from "@coveo/atomic/components/atomic-product-rating.js";
import { AtomicProductSectionActions as AtomicProductSectionActionsElement, defineCustomElement as defineAtomicProductSectionActions } from "@coveo/atomic/components/atomic-product-section-actions.js";
import { AtomicProductSectionBadges as AtomicProductSectionBadgesElement, defineCustomElement as defineAtomicProductSectionBadges } from "@coveo/atomic/components/atomic-product-section-badges.js";
import { AtomicProductSectionBottomMetadata as AtomicProductSectionBottomMetadataElement, defineCustomElement as defineAtomicProductSectionBottomMetadata } from "@coveo/atomic/components/atomic-product-section-bottom-metadata.js";
import { AtomicProductSectionChildren as AtomicProductSectionChildrenElement, defineCustomElement as defineAtomicProductSectionChildren } from "@coveo/atomic/components/atomic-product-section-children.js";
import { AtomicProductSectionDescription as AtomicProductSectionDescriptionElement, defineCustomElement as defineAtomicProductSectionDescription } from "@coveo/atomic/components/atomic-product-section-description.js";
import { AtomicProductSectionEmphasized as AtomicProductSectionEmphasizedElement, defineCustomElement as defineAtomicProductSectionEmphasized } from "@coveo/atomic/components/atomic-product-section-emphasized.js";
import { AtomicProductSectionMetadata as AtomicProductSectionMetadataElement, defineCustomElement as defineAtomicProductSectionMetadata } from "@coveo/atomic/components/atomic-product-section-metadata.js";
import { AtomicProductSectionName as AtomicProductSectionNameElement, defineCustomElement as defineAtomicProductSectionName } from "@coveo/atomic/components/atomic-product-section-name.js";
import { AtomicProductSectionVisual as AtomicProductSectionVisualElement, defineCustomElement as defineAtomicProductSectionVisual } from "@coveo/atomic/components/atomic-product-section-visual.js";
import { AtomicProductText as AtomicProductTextElement, defineCustomElement as defineAtomicProductText } from "@coveo/atomic/components/atomic-product-text.js";
import { AtomicProduct as AtomicProductElement, defineCustomElement as defineAtomicProduct } from "@coveo/atomic/components/atomic-product.js";
import { AtomicResultLocalizedText as AtomicResultLocalizedTextElement, defineCustomElement as defineAtomicResultLocalizedText } from "@coveo/atomic/components/atomic-result-localized-text.js";
import { AtomicTimeframe as AtomicTimeframeElement, defineCustomElement as defineAtomicTimeframe } from "@coveo/atomic/components/atomic-timeframe.js";
import type { EventName, StencilReactComponent } from '@stencil/react-output-target/runtime';
import { createComponent } from '@stencil/react-output-target/runtime';
import React from 'react';

type AtomicCommerceBreadboxEvents = NonNullable<unknown>;

export const AtomicCommerceBreadbox: StencilReactComponent<AtomicCommerceBreadboxElement, AtomicCommerceBreadboxEvents> = /*@__PURE__*/ createComponent<AtomicCommerceBreadboxElement, AtomicCommerceBreadboxEvents>({
    tagName: 'atomic-commerce-breadbox',
    elementClass: AtomicCommerceBreadboxElement,
    react: React,
    events: {} as AtomicCommerceBreadboxEvents,
    defineCustomElement: defineAtomicCommerceBreadbox
});

type AtomicCommerceCategoryFacetEvents = NonNullable<unknown>;

export const AtomicCommerceCategoryFacet: StencilReactComponent<AtomicCommerceCategoryFacetElement, AtomicCommerceCategoryFacetEvents> = /*@__PURE__*/ createComponent<AtomicCommerceCategoryFacetElement, AtomicCommerceCategoryFacetEvents>({
    tagName: 'atomic-commerce-category-facet',
    elementClass: AtomicCommerceCategoryFacetElement,
    react: React,
    events: {} as AtomicCommerceCategoryFacetEvents,
    defineCustomElement: defineAtomicCommerceCategoryFacet
});

type AtomicCommerceDidYouMeanEvents = NonNullable<unknown>;

export const AtomicCommerceDidYouMean: StencilReactComponent<AtomicCommerceDidYouMeanElement, AtomicCommerceDidYouMeanEvents> = /*@__PURE__*/ createComponent<AtomicCommerceDidYouMeanElement, AtomicCommerceDidYouMeanEvents>({
    tagName: 'atomic-commerce-did-you-mean',
    elementClass: AtomicCommerceDidYouMeanElement,
    react: React,
    events: {} as AtomicCommerceDidYouMeanEvents,
    defineCustomElement: defineAtomicCommerceDidYouMean
});

type AtomicCommerceFacetEvents = NonNullable<unknown>;

export const AtomicCommerceFacet: StencilReactComponent<AtomicCommerceFacetElement, AtomicCommerceFacetEvents> = /*@__PURE__*/ createComponent<AtomicCommerceFacetElement, AtomicCommerceFacetEvents>({
    tagName: 'atomic-commerce-facet',
    elementClass: AtomicCommerceFacetElement,
    react: React,
    events: {} as AtomicCommerceFacetEvents,
    defineCustomElement: defineAtomicCommerceFacet
});

type AtomicCommerceFacetNumberInputEvents = { onAtomicNumberInputApply: EventName<CustomEvent<any>> };

export const AtomicCommerceFacetNumberInput: StencilReactComponent<AtomicCommerceFacetNumberInputElement, AtomicCommerceFacetNumberInputEvents> = /*@__PURE__*/ createComponent<AtomicCommerceFacetNumberInputElement, AtomicCommerceFacetNumberInputEvents>({
    tagName: 'atomic-commerce-facet-number-input',
    elementClass: AtomicCommerceFacetNumberInputElement,
    react: React,
    events: { onAtomicNumberInputApply: 'atomic/numberInputApply' } as AtomicCommerceFacetNumberInputEvents,
    defineCustomElement: defineAtomicCommerceFacetNumberInput
});

type AtomicCommerceFacetsEvents = NonNullable<unknown>;

export const AtomicCommerceFacets: StencilReactComponent<AtomicCommerceFacetsElement, AtomicCommerceFacetsEvents> = /*@__PURE__*/ createComponent<AtomicCommerceFacetsElement, AtomicCommerceFacetsEvents>({
    tagName: 'atomic-commerce-facets',
    elementClass: AtomicCommerceFacetsElement,
    react: React,
    events: {} as AtomicCommerceFacetsEvents,
    defineCustomElement: defineAtomicCommerceFacets
});

type AtomicCommerceInterfaceEvents = NonNullable<unknown>;

export const AtomicCommerceInterface: StencilReactComponent<AtomicCommerceInterfaceElement, AtomicCommerceInterfaceEvents> = /*@__PURE__*/ createComponent<AtomicCommerceInterfaceElement, AtomicCommerceInterfaceEvents>({
    tagName: 'atomic-commerce-interface',
    elementClass: AtomicCommerceInterfaceElement,
    react: React,
    events: {} as AtomicCommerceInterfaceEvents,
    defineCustomElement: defineAtomicCommerceInterface
});

type AtomicCommerceLayoutEvents = NonNullable<unknown>;

export const AtomicCommerceLayout: StencilReactComponent<AtomicCommerceLayoutElement, AtomicCommerceLayoutEvents> = /*@__PURE__*/ createComponent<AtomicCommerceLayoutElement, AtomicCommerceLayoutEvents>({
    tagName: 'atomic-commerce-layout',
    elementClass: AtomicCommerceLayoutElement,
    react: React,
    events: {} as AtomicCommerceLayoutEvents,
    defineCustomElement: defineAtomicCommerceLayout
});

type AtomicCommerceLoadMoreProductsEvents = NonNullable<unknown>;

export const AtomicCommerceLoadMoreProducts: StencilReactComponent<AtomicCommerceLoadMoreProductsElement, AtomicCommerceLoadMoreProductsEvents> = /*@__PURE__*/ createComponent<AtomicCommerceLoadMoreProductsElement, AtomicCommerceLoadMoreProductsEvents>({
    tagName: 'atomic-commerce-load-more-products',
    elementClass: AtomicCommerceLoadMoreProductsElement,
    react: React,
    events: {} as AtomicCommerceLoadMoreProductsEvents,
    defineCustomElement: defineAtomicCommerceLoadMoreProducts
});

type AtomicCommerceNoProductsEvents = NonNullable<unknown>;

export const AtomicCommerceNoProducts: StencilReactComponent<AtomicCommerceNoProductsElement, AtomicCommerceNoProductsEvents> = /*@__PURE__*/ createComponent<AtomicCommerceNoProductsElement, AtomicCommerceNoProductsEvents>({
    tagName: 'atomic-commerce-no-products',
    elementClass: AtomicCommerceNoProductsElement,
    react: React,
    events: {} as AtomicCommerceNoProductsEvents,
    defineCustomElement: defineAtomicCommerceNoProducts
});

type AtomicCommerceNumericFacetEvents = NonNullable<unknown>;

export const AtomicCommerceNumericFacet: StencilReactComponent<AtomicCommerceNumericFacetElement, AtomicCommerceNumericFacetEvents> = /*@__PURE__*/ createComponent<AtomicCommerceNumericFacetElement, AtomicCommerceNumericFacetEvents>({
    tagName: 'atomic-commerce-numeric-facet',
    elementClass: AtomicCommerceNumericFacetElement,
    react: React,
    events: {} as AtomicCommerceNumericFacetEvents,
    defineCustomElement: defineAtomicCommerceNumericFacet
});

type AtomicCommercePagerEvents = { onAtomicScrollToTop: EventName<CustomEvent<any>> };

export const AtomicCommercePager: StencilReactComponent<AtomicCommercePagerElement, AtomicCommercePagerEvents> = /*@__PURE__*/ createComponent<AtomicCommercePagerElement, AtomicCommercePagerEvents>({
    tagName: 'atomic-commerce-pager',
    elementClass: AtomicCommercePagerElement,
    react: React,
    events: { onAtomicScrollToTop: 'atomic/scrollToTop' } as AtomicCommercePagerEvents,
    defineCustomElement: defineAtomicCommercePager
});

type AtomicCommerceProductListEvents = NonNullable<unknown>;

export const AtomicCommerceProductList: StencilReactComponent<AtomicCommerceProductListElement, AtomicCommerceProductListEvents> = /*@__PURE__*/ createComponent<AtomicCommerceProductListElement, AtomicCommerceProductListEvents>({
    tagName: 'atomic-commerce-product-list',
    elementClass: AtomicCommerceProductListElement,
    react: React,
    events: {} as AtomicCommerceProductListEvents,
    defineCustomElement: defineAtomicCommerceProductList
});

type AtomicCommerceProductsPerPageEvents = { onAtomicScrollToTop: EventName<CustomEvent<any>> };

export const AtomicCommerceProductsPerPage: StencilReactComponent<AtomicCommerceProductsPerPageElement, AtomicCommerceProductsPerPageEvents> = /*@__PURE__*/ createComponent<AtomicCommerceProductsPerPageElement, AtomicCommerceProductsPerPageEvents>({
    tagName: 'atomic-commerce-products-per-page',
    elementClass: AtomicCommerceProductsPerPageElement,
    react: React,
    events: { onAtomicScrollToTop: 'atomic/scrollToTop' } as AtomicCommerceProductsPerPageEvents,
    defineCustomElement: defineAtomicCommerceProductsPerPage
});

type AtomicCommerceQueryErrorEvents = NonNullable<unknown>;

export const AtomicCommerceQueryError: StencilReactComponent<AtomicCommerceQueryErrorElement, AtomicCommerceQueryErrorEvents> = /*@__PURE__*/ createComponent<AtomicCommerceQueryErrorElement, AtomicCommerceQueryErrorEvents>({
    tagName: 'atomic-commerce-query-error',
    elementClass: AtomicCommerceQueryErrorElement,
    react: React,
    events: {} as AtomicCommerceQueryErrorEvents,
    defineCustomElement: defineAtomicCommerceQueryError
});

type AtomicCommerceQuerySummaryEvents = NonNullable<unknown>;

export const AtomicCommerceQuerySummary: StencilReactComponent<AtomicCommerceQuerySummaryElement, AtomicCommerceQuerySummaryEvents> = /*@__PURE__*/ createComponent<AtomicCommerceQuerySummaryElement, AtomicCommerceQuerySummaryEvents>({
    tagName: 'atomic-commerce-query-summary',
    elementClass: AtomicCommerceQuerySummaryElement,
    react: React,
    events: {} as AtomicCommerceQuerySummaryEvents,
    defineCustomElement: defineAtomicCommerceQuerySummary
});

type AtomicCommerceRecommendationInterfaceEvents = NonNullable<unknown>;

export const AtomicCommerceRecommendationInterface: StencilReactComponent<AtomicCommerceRecommendationInterfaceElement, AtomicCommerceRecommendationInterfaceEvents> = /*@__PURE__*/ createComponent<AtomicCommerceRecommendationInterfaceElement, AtomicCommerceRecommendationInterfaceEvents>({
    tagName: 'atomic-commerce-recommendation-interface',
    elementClass: AtomicCommerceRecommendationInterfaceElement,
    react: React,
    events: {} as AtomicCommerceRecommendationInterfaceEvents,
    defineCustomElement: defineAtomicCommerceRecommendationInterface
});

type AtomicCommerceRecommendationListEvents = NonNullable<unknown>;

export const AtomicCommerceRecommendationList: StencilReactComponent<AtomicCommerceRecommendationListElement, AtomicCommerceRecommendationListEvents> = /*@__PURE__*/ createComponent<AtomicCommerceRecommendationListElement, AtomicCommerceRecommendationListEvents>({
    tagName: 'atomic-commerce-recommendation-list',
    elementClass: AtomicCommerceRecommendationListElement,
    react: React,
    events: {} as AtomicCommerceRecommendationListEvents,
    defineCustomElement: defineAtomicCommerceRecommendationList
});

type AtomicCommerceRefineModalEvents = NonNullable<unknown>;

export const AtomicCommerceRefineModal: StencilReactComponent<AtomicCommerceRefineModalElement, AtomicCommerceRefineModalEvents> = /*@__PURE__*/ createComponent<AtomicCommerceRefineModalElement, AtomicCommerceRefineModalEvents>({
    tagName: 'atomic-commerce-refine-modal',
    elementClass: AtomicCommerceRefineModalElement,
    react: React,
    events: {} as AtomicCommerceRefineModalEvents,
    defineCustomElement: defineAtomicCommerceRefineModal
});

type AtomicCommerceRefineToggleEvents = NonNullable<unknown>;

export const AtomicCommerceRefineToggle: StencilReactComponent<AtomicCommerceRefineToggleElement, AtomicCommerceRefineToggleEvents> = /*@__PURE__*/ createComponent<AtomicCommerceRefineToggleElement, AtomicCommerceRefineToggleEvents>({
    tagName: 'atomic-commerce-refine-toggle',
    elementClass: AtomicCommerceRefineToggleElement,
    react: React,
    events: {} as AtomicCommerceRefineToggleEvents,
    defineCustomElement: defineAtomicCommerceRefineToggle
});

type AtomicCommerceSearchBoxEvents = { onRedirect: EventName<AtomicCommerceSearchBoxCustomEvent<RedirectionPayload>> };

export const AtomicCommerceSearchBox: StencilReactComponent<AtomicCommerceSearchBoxElement, AtomicCommerceSearchBoxEvents> = /*@__PURE__*/ createComponent<AtomicCommerceSearchBoxElement, AtomicCommerceSearchBoxEvents>({
    tagName: 'atomic-commerce-search-box',
    elementClass: AtomicCommerceSearchBoxElement,
    react: React,
    events: { onRedirect: 'redirect' } as AtomicCommerceSearchBoxEvents,
    defineCustomElement: defineAtomicCommerceSearchBox
});

type AtomicCommerceSearchBoxInstantProductsEvents = NonNullable<unknown>;

export const AtomicCommerceSearchBoxInstantProducts: StencilReactComponent<AtomicCommerceSearchBoxInstantProductsElement, AtomicCommerceSearchBoxInstantProductsEvents> = /*@__PURE__*/ createComponent<AtomicCommerceSearchBoxInstantProductsElement, AtomicCommerceSearchBoxInstantProductsEvents>({
    tagName: 'atomic-commerce-search-box-instant-products',
    elementClass: AtomicCommerceSearchBoxInstantProductsElement,
    react: React,
    events: {} as AtomicCommerceSearchBoxInstantProductsEvents,
    defineCustomElement: defineAtomicCommerceSearchBoxInstantProducts
});

type AtomicCommerceSearchBoxQuerySuggestionsEvents = NonNullable<unknown>;

export const AtomicCommerceSearchBoxQuerySuggestions: StencilReactComponent<AtomicCommerceSearchBoxQuerySuggestionsElement, AtomicCommerceSearchBoxQuerySuggestionsEvents> = /*@__PURE__*/ createComponent<AtomicCommerceSearchBoxQuerySuggestionsElement, AtomicCommerceSearchBoxQuerySuggestionsEvents>({
    tagName: 'atomic-commerce-search-box-query-suggestions',
    elementClass: AtomicCommerceSearchBoxQuerySuggestionsElement,
    react: React,
    events: {} as AtomicCommerceSearchBoxQuerySuggestionsEvents,
    defineCustomElement: defineAtomicCommerceSearchBoxQuerySuggestions
});

type AtomicCommerceSearchBoxRecentQueriesEvents = NonNullable<unknown>;

export const AtomicCommerceSearchBoxRecentQueries: StencilReactComponent<AtomicCommerceSearchBoxRecentQueriesElement, AtomicCommerceSearchBoxRecentQueriesEvents> = /*@__PURE__*/ createComponent<AtomicCommerceSearchBoxRecentQueriesElement, AtomicCommerceSearchBoxRecentQueriesEvents>({
    tagName: 'atomic-commerce-search-box-recent-queries',
    elementClass: AtomicCommerceSearchBoxRecentQueriesElement,
    react: React,
    events: {} as AtomicCommerceSearchBoxRecentQueriesEvents,
    defineCustomElement: defineAtomicCommerceSearchBoxRecentQueries
});

type AtomicCommerceSortDropdownEvents = NonNullable<unknown>;

export const AtomicCommerceSortDropdown: StencilReactComponent<AtomicCommerceSortDropdownElement, AtomicCommerceSortDropdownEvents> = /*@__PURE__*/ createComponent<AtomicCommerceSortDropdownElement, AtomicCommerceSortDropdownEvents>({
    tagName: 'atomic-commerce-sort-dropdown',
    elementClass: AtomicCommerceSortDropdownElement,
    react: React,
    events: {} as AtomicCommerceSortDropdownEvents,
    defineCustomElement: defineAtomicCommerceSortDropdown
});

type AtomicCommerceTextEvents = NonNullable<unknown>;

export const AtomicCommerceText: StencilReactComponent<AtomicCommerceTextElement, AtomicCommerceTextEvents> = /*@__PURE__*/ createComponent<AtomicCommerceTextElement, AtomicCommerceTextEvents>({
    tagName: 'atomic-commerce-text',
    elementClass: AtomicCommerceTextElement,
    react: React,
    events: {} as AtomicCommerceTextEvents,
    defineCustomElement: defineAtomicCommerceText
});

type AtomicCommerceTimeframeFacetEvents = NonNullable<unknown>;

export const AtomicCommerceTimeframeFacet: StencilReactComponent<AtomicCommerceTimeframeFacetElement, AtomicCommerceTimeframeFacetEvents> = /*@__PURE__*/ createComponent<AtomicCommerceTimeframeFacetElement, AtomicCommerceTimeframeFacetEvents>({
    tagName: 'atomic-commerce-timeframe-facet',
    elementClass: AtomicCommerceTimeframeFacetElement,
    react: React,
    events: {} as AtomicCommerceTimeframeFacetEvents,
    defineCustomElement: defineAtomicCommerceTimeframeFacet
});

type AtomicIconEvents = NonNullable<unknown>;

export const AtomicIcon: StencilReactComponent<AtomicIconElement, AtomicIconEvents> = /*@__PURE__*/ createComponent<AtomicIconElement, AtomicIconEvents>({
    tagName: 'atomic-icon',
    elementClass: AtomicIconElement,
    react: React,
    events: {} as AtomicIconEvents,
    defineCustomElement: defineAtomicIcon
});

type AtomicLayoutSectionEvents = NonNullable<unknown>;

export const AtomicLayoutSection: StencilReactComponent<AtomicLayoutSectionElement, AtomicLayoutSectionEvents> = /*@__PURE__*/ createComponent<AtomicLayoutSectionElement, AtomicLayoutSectionEvents>({
    tagName: 'atomic-layout-section',
    elementClass: AtomicLayoutSectionElement,
    react: React,
    events: {} as AtomicLayoutSectionEvents,
    defineCustomElement: defineAtomicLayoutSection
});

type AtomicNumericRangeEvents = NonNullable<unknown>;

export const AtomicNumericRange: StencilReactComponent<AtomicNumericRangeElement, AtomicNumericRangeEvents> = /*@__PURE__*/ createComponent<AtomicNumericRangeElement, AtomicNumericRangeEvents>({
    tagName: 'atomic-numeric-range',
    elementClass: AtomicNumericRangeElement,
    react: React,
    events: {} as AtomicNumericRangeEvents,
    defineCustomElement: defineAtomicNumericRange
});

type AtomicProductEvents = NonNullable<unknown>;

export const AtomicProduct: StencilReactComponent<AtomicProductElement, AtomicProductEvents> = /*@__PURE__*/ createComponent<AtomicProductElement, AtomicProductEvents>({
    tagName: 'atomic-product',
    elementClass: AtomicProductElement,
    react: React,
    events: {} as AtomicProductEvents,
    defineCustomElement: defineAtomicProduct
});

type AtomicProductChildrenEvents = { onAtomicSelectChildProduct: EventName<AtomicProductChildrenCustomEvent<SelectChildProductEventArgs>> };

export const AtomicProductChildren: StencilReactComponent<AtomicProductChildrenElement, AtomicProductChildrenEvents> = /*@__PURE__*/ createComponent<AtomicProductChildrenElement, AtomicProductChildrenEvents>({
    tagName: 'atomic-product-children',
    elementClass: AtomicProductChildrenElement,
    react: React,
    events: { onAtomicSelectChildProduct: 'atomic/selectChildProduct' } as AtomicProductChildrenEvents,
    defineCustomElement: defineAtomicProductChildren
});

type AtomicProductDescriptionEvents = NonNullable<unknown>;

export const AtomicProductDescription: StencilReactComponent<AtomicProductDescriptionElement, AtomicProductDescriptionEvents> = /*@__PURE__*/ createComponent<AtomicProductDescriptionElement, AtomicProductDescriptionEvents>({
    tagName: 'atomic-product-description',
    elementClass: AtomicProductDescriptionElement,
    react: React,
    events: {} as AtomicProductDescriptionEvents,
    defineCustomElement: defineAtomicProductDescription
});

type AtomicProductFieldConditionEvents = NonNullable<unknown>;

export const AtomicProductFieldCondition: StencilReactComponent<AtomicProductFieldConditionElement, AtomicProductFieldConditionEvents> = /*@__PURE__*/ createComponent<AtomicProductFieldConditionElement, AtomicProductFieldConditionEvents>({
    tagName: 'atomic-product-field-condition',
    elementClass: AtomicProductFieldConditionElement,
    react: React,
    events: {} as AtomicProductFieldConditionEvents,
    defineCustomElement: defineAtomicProductFieldCondition
});

type AtomicProductImageEvents = NonNullable<unknown>;

export const AtomicProductImage: StencilReactComponent<AtomicProductImageElement, AtomicProductImageEvents> = /*@__PURE__*/ createComponent<AtomicProductImageElement, AtomicProductImageEvents>({
    tagName: 'atomic-product-image',
    elementClass: AtomicProductImageElement,
    react: React,
    events: {} as AtomicProductImageEvents,
    defineCustomElement: defineAtomicProductImage
});

type AtomicProductLinkEvents = NonNullable<unknown>;

export const AtomicProductLink: StencilReactComponent<AtomicProductLinkElement, AtomicProductLinkEvents> = /*@__PURE__*/ createComponent<AtomicProductLinkElement, AtomicProductLinkEvents>({
    tagName: 'atomic-product-link',
    elementClass: AtomicProductLinkElement,
    react: React,
    events: {} as AtomicProductLinkEvents,
    defineCustomElement: defineAtomicProductLink
});

type AtomicProductNumericFieldValueEvents = NonNullable<unknown>;

export const AtomicProductNumericFieldValue: StencilReactComponent<AtomicProductNumericFieldValueElement, AtomicProductNumericFieldValueEvents> = /*@__PURE__*/ createComponent<AtomicProductNumericFieldValueElement, AtomicProductNumericFieldValueEvents>({
    tagName: 'atomic-product-numeric-field-value',
    elementClass: AtomicProductNumericFieldValueElement,
    react: React,
    events: {} as AtomicProductNumericFieldValueEvents,
    defineCustomElement: defineAtomicProductNumericFieldValue
});

type AtomicProductPriceEvents = NonNullable<unknown>;

export const AtomicProductPrice: StencilReactComponent<AtomicProductPriceElement, AtomicProductPriceEvents> = /*@__PURE__*/ createComponent<AtomicProductPriceElement, AtomicProductPriceEvents>({
    tagName: 'atomic-product-price',
    elementClass: AtomicProductPriceElement,
    react: React,
    events: {} as AtomicProductPriceEvents,
    defineCustomElement: defineAtomicProductPrice
});

type AtomicProductRatingEvents = NonNullable<unknown>;

export const AtomicProductRating: StencilReactComponent<AtomicProductRatingElement, AtomicProductRatingEvents> = /*@__PURE__*/ createComponent<AtomicProductRatingElement, AtomicProductRatingEvents>({
    tagName: 'atomic-product-rating',
    elementClass: AtomicProductRatingElement,
    react: React,
    events: {} as AtomicProductRatingEvents,
    defineCustomElement: defineAtomicProductRating
});

type AtomicProductSectionActionsEvents = NonNullable<unknown>;

export const AtomicProductSectionActions: StencilReactComponent<AtomicProductSectionActionsElement, AtomicProductSectionActionsEvents> = /*@__PURE__*/ createComponent<AtomicProductSectionActionsElement, AtomicProductSectionActionsEvents>({
    tagName: 'atomic-product-section-actions',
    elementClass: AtomicProductSectionActionsElement,
    react: React,
    events: {} as AtomicProductSectionActionsEvents,
    defineCustomElement: defineAtomicProductSectionActions
});

type AtomicProductSectionBadgesEvents = NonNullable<unknown>;

export const AtomicProductSectionBadges: StencilReactComponent<AtomicProductSectionBadgesElement, AtomicProductSectionBadgesEvents> = /*@__PURE__*/ createComponent<AtomicProductSectionBadgesElement, AtomicProductSectionBadgesEvents>({
    tagName: 'atomic-product-section-badges',
    elementClass: AtomicProductSectionBadgesElement,
    react: React,
    events: {} as AtomicProductSectionBadgesEvents,
    defineCustomElement: defineAtomicProductSectionBadges
});

type AtomicProductSectionBottomMetadataEvents = NonNullable<unknown>;

export const AtomicProductSectionBottomMetadata: StencilReactComponent<AtomicProductSectionBottomMetadataElement, AtomicProductSectionBottomMetadataEvents> = /*@__PURE__*/ createComponent<AtomicProductSectionBottomMetadataElement, AtomicProductSectionBottomMetadataEvents>({
    tagName: 'atomic-product-section-bottom-metadata',
    elementClass: AtomicProductSectionBottomMetadataElement,
    react: React,
    events: {} as AtomicProductSectionBottomMetadataEvents,
    defineCustomElement: defineAtomicProductSectionBottomMetadata
});

type AtomicProductSectionChildrenEvents = NonNullable<unknown>;

export const AtomicProductSectionChildren: StencilReactComponent<AtomicProductSectionChildrenElement, AtomicProductSectionChildrenEvents> = /*@__PURE__*/ createComponent<AtomicProductSectionChildrenElement, AtomicProductSectionChildrenEvents>({
    tagName: 'atomic-product-section-children',
    elementClass: AtomicProductSectionChildrenElement,
    react: React,
    events: {} as AtomicProductSectionChildrenEvents,
    defineCustomElement: defineAtomicProductSectionChildren
});

type AtomicProductSectionDescriptionEvents = NonNullable<unknown>;

export const AtomicProductSectionDescription: StencilReactComponent<AtomicProductSectionDescriptionElement, AtomicProductSectionDescriptionEvents> = /*@__PURE__*/ createComponent<AtomicProductSectionDescriptionElement, AtomicProductSectionDescriptionEvents>({
    tagName: 'atomic-product-section-description',
    elementClass: AtomicProductSectionDescriptionElement,
    react: React,
    events: {} as AtomicProductSectionDescriptionEvents,
    defineCustomElement: defineAtomicProductSectionDescription
});

type AtomicProductSectionEmphasizedEvents = NonNullable<unknown>;

export const AtomicProductSectionEmphasized: StencilReactComponent<AtomicProductSectionEmphasizedElement, AtomicProductSectionEmphasizedEvents> = /*@__PURE__*/ createComponent<AtomicProductSectionEmphasizedElement, AtomicProductSectionEmphasizedEvents>({
    tagName: 'atomic-product-section-emphasized',
    elementClass: AtomicProductSectionEmphasizedElement,
    react: React,
    events: {} as AtomicProductSectionEmphasizedEvents,
    defineCustomElement: defineAtomicProductSectionEmphasized
});

type AtomicProductSectionMetadataEvents = NonNullable<unknown>;

export const AtomicProductSectionMetadata: StencilReactComponent<AtomicProductSectionMetadataElement, AtomicProductSectionMetadataEvents> = /*@__PURE__*/ createComponent<AtomicProductSectionMetadataElement, AtomicProductSectionMetadataEvents>({
    tagName: 'atomic-product-section-metadata',
    elementClass: AtomicProductSectionMetadataElement,
    react: React,
    events: {} as AtomicProductSectionMetadataEvents,
    defineCustomElement: defineAtomicProductSectionMetadata
});

type AtomicProductSectionNameEvents = NonNullable<unknown>;

export const AtomicProductSectionName: StencilReactComponent<AtomicProductSectionNameElement, AtomicProductSectionNameEvents> = /*@__PURE__*/ createComponent<AtomicProductSectionNameElement, AtomicProductSectionNameEvents>({
    tagName: 'atomic-product-section-name',
    elementClass: AtomicProductSectionNameElement,
    react: React,
    events: {} as AtomicProductSectionNameEvents,
    defineCustomElement: defineAtomicProductSectionName
});

type AtomicProductSectionVisualEvents = NonNullable<unknown>;

export const AtomicProductSectionVisual: StencilReactComponent<AtomicProductSectionVisualElement, AtomicProductSectionVisualEvents> = /*@__PURE__*/ createComponent<AtomicProductSectionVisualElement, AtomicProductSectionVisualEvents>({
    tagName: 'atomic-product-section-visual',
    elementClass: AtomicProductSectionVisualElement,
    react: React,
    events: {} as AtomicProductSectionVisualEvents,
    defineCustomElement: defineAtomicProductSectionVisual
});

type AtomicProductTextEvents = NonNullable<unknown>;

export const AtomicProductText: StencilReactComponent<AtomicProductTextElement, AtomicProductTextEvents> = /*@__PURE__*/ createComponent<AtomicProductTextElement, AtomicProductTextEvents>({
    tagName: 'atomic-product-text',
    elementClass: AtomicProductTextElement,
    react: React,
    events: {} as AtomicProductTextEvents,
    defineCustomElement: defineAtomicProductText
});

type AtomicResultLocalizedTextEvents = NonNullable<unknown>;

export const AtomicResultLocalizedText: StencilReactComponent<AtomicResultLocalizedTextElement, AtomicResultLocalizedTextEvents> = /*@__PURE__*/ createComponent<AtomicResultLocalizedTextElement, AtomicResultLocalizedTextEvents>({
    tagName: 'atomic-result-localized-text',
    elementClass: AtomicResultLocalizedTextElement,
    react: React,
    events: {} as AtomicResultLocalizedTextEvents,
    defineCustomElement: defineAtomicResultLocalizedText
});

type AtomicTimeframeEvents = NonNullable<unknown>;

export const AtomicTimeframe: StencilReactComponent<AtomicTimeframeElement, AtomicTimeframeEvents> = /*@__PURE__*/ createComponent<AtomicTimeframeElement, AtomicTimeframeEvents>({
    tagName: 'atomic-timeframe',
    elementClass: AtomicTimeframeElement,
    react: React,
    events: {} as AtomicTimeframeEvents,
    defineCustomElement: defineAtomicTimeframe
});
