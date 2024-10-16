/* tslint:disable */
/* auto-generated angular module */
import {CommonModule} from '@angular/common';
import {APP_INITIALIZER, ModuleWithProviders, NgModule, Provider} from '@angular/core';

        
import {
AtomicAriaLive,
AtomicAutomaticFacet,
AtomicAutomaticFacetGenerator,
AtomicBreadbox,
AtomicCategoryFacet,
AtomicColorFacet,
AtomicCommerceBreadbox,
AtomicCommerceCategoryFacet,
AtomicCommerceDidYouMean,
AtomicCommerceFacet,
AtomicCommerceFacetNumberInput,
AtomicCommerceFacets,
AtomicCommerceInterface,
AtomicCommerceLayout,
AtomicCommerceLoadMoreProducts,
AtomicCommerceNoProducts,
AtomicCommerceNumericFacet,
AtomicCommercePager,
AtomicCommerceProductList,
AtomicCommerceProductsPerPage,
AtomicCommerceQueryError,
AtomicCommerceQuerySummary,
AtomicCommerceRecommendationInterface,
AtomicCommerceRecommendationList,
AtomicCommerceRefineModal,
AtomicCommerceRefineToggle,
AtomicCommerceSearchBox,
AtomicCommerceSearchBoxInstantProducts,
AtomicCommerceSearchBoxQuerySuggestions,
AtomicCommerceSearchBoxRecentQueries,
AtomicCommerceSortDropdown,
AtomicCommerceText,
AtomicCommerceTimeframeFacet,
AtomicComponentError,
AtomicDidYouMean,
AtomicExternal,
AtomicFacet,
AtomicFacetManager,
AtomicFieldCondition,
AtomicFoldedResultList,
AtomicFormatCurrency,
AtomicFormatNumber,
AtomicFormatUnit,
AtomicGeneratedAnswer,
AtomicHtml,
AtomicIcon,
AtomicLayoutSection,
AtomicLoadMoreResults,
AtomicNoResults,
AtomicNotifications,
AtomicNumericFacet,
AtomicNumericRange,
AtomicPager,
AtomicPopover,
AtomicProduct,
AtomicProductChildren,
AtomicProductDescription,
AtomicProductExcerpt,
AtomicProductFieldCondition,
AtomicProductImage,
AtomicProductLink,
AtomicProductNumericFieldValue,
AtomicProductPrice,
AtomicProductRating,
AtomicProductSectionActions,
AtomicProductSectionBadges,
AtomicProductSectionBottomMetadata,
AtomicProductSectionChildren,
AtomicProductSectionDescription,
AtomicProductSectionEmphasized,
AtomicProductSectionMetadata,
AtomicProductSectionName,
AtomicProductSectionVisual,
AtomicProductTemplate,
AtomicProductText,
AtomicQueryError,
AtomicQuerySummary,
AtomicQuickview,
AtomicQuickviewModal,
AtomicRatingFacet,
AtomicRatingRangeFacet,
AtomicRecsError,
AtomicRecsInterface,
AtomicRecsList,
AtomicRecsResult,
AtomicRecsResultTemplate,
AtomicRefineModal,
AtomicRefineToggle,
AtomicRelevanceInspector,
AtomicResult,
AtomicResultBadge,
AtomicResultChildren,
AtomicResultChildrenTemplate,
AtomicResultDate,
AtomicResultFieldsList,
AtomicResultHtml,
AtomicResultIcon,
AtomicResultImage,
AtomicResultLink,
AtomicResultList,
AtomicResultLocalizedText,
AtomicResultMultiValueText,
AtomicResultNumber,
AtomicResultPrintableUri,
AtomicResultRating,
AtomicResultSectionActions,
AtomicResultSectionBadges,
AtomicResultSectionBottomMetadata,
AtomicResultSectionChildren,
AtomicResultSectionEmphasized,
AtomicResultSectionExcerpt,
AtomicResultSectionTitle,
AtomicResultSectionTitleMetadata,
AtomicResultSectionVisual,
AtomicResultTemplate,
AtomicResultText,
AtomicResultTimespan,
AtomicResultsPerPage,
AtomicSearchBox,
AtomicSearchBoxInstantResults,
AtomicSearchBoxQuerySuggestions,
AtomicSearchBoxRecentQueries,
AtomicSearchInterface,
AtomicSearchLayout,
AtomicSegmentedFacet,
AtomicSegmentedFacetScrollable,
AtomicSmartSnippet,
AtomicSmartSnippetFeedbackModal,
AtomicSmartSnippetSuggestions,
AtomicSortDropdown,
AtomicSortExpression,
AtomicTabManager,
AtomicTableElement,
AtomicText,
AtomicTimeframe,
AtomicTimeframeFacet
} from './components';

        
import {defineCustomElements} from '@coveo/atomic/loader';
defineCustomElements(window);

        
const DECLARATIONS = [
AtomicAriaLive,
AtomicAutomaticFacet,
AtomicAutomaticFacetGenerator,
AtomicBreadbox,
AtomicCategoryFacet,
AtomicColorFacet,
AtomicCommerceBreadbox,
AtomicCommerceCategoryFacet,
AtomicCommerceDidYouMean,
AtomicCommerceFacet,
AtomicCommerceFacetNumberInput,
AtomicCommerceFacets,
AtomicCommerceInterface,
AtomicCommerceLayout,
AtomicCommerceLoadMoreProducts,
AtomicCommerceNoProducts,
AtomicCommerceNumericFacet,
AtomicCommercePager,
AtomicCommerceProductList,
AtomicCommerceProductsPerPage,
AtomicCommerceQueryError,
AtomicCommerceQuerySummary,
AtomicCommerceRecommendationInterface,
AtomicCommerceRecommendationList,
AtomicCommerceRefineModal,
AtomicCommerceRefineToggle,
AtomicCommerceSearchBox,
AtomicCommerceSearchBoxInstantProducts,
AtomicCommerceSearchBoxQuerySuggestions,
AtomicCommerceSearchBoxRecentQueries,
AtomicCommerceSortDropdown,
AtomicCommerceText,
AtomicCommerceTimeframeFacet,
AtomicComponentError,
AtomicDidYouMean,
AtomicExternal,
AtomicFacet,
AtomicFacetManager,
AtomicFieldCondition,
AtomicFoldedResultList,
AtomicFormatCurrency,
AtomicFormatNumber,
AtomicFormatUnit,
AtomicGeneratedAnswer,
AtomicHtml,
AtomicIcon,
AtomicLayoutSection,
AtomicLoadMoreResults,
AtomicNoResults,
AtomicNotifications,
AtomicNumericFacet,
AtomicNumericRange,
AtomicPager,
AtomicPopover,
AtomicProduct,
AtomicProductChildren,
AtomicProductDescription,
AtomicProductExcerpt,
AtomicProductFieldCondition,
AtomicProductImage,
AtomicProductLink,
AtomicProductNumericFieldValue,
AtomicProductPrice,
AtomicProductRating,
AtomicProductSectionActions,
AtomicProductSectionBadges,
AtomicProductSectionBottomMetadata,
AtomicProductSectionChildren,
AtomicProductSectionDescription,
AtomicProductSectionEmphasized,
AtomicProductSectionMetadata,
AtomicProductSectionName,
AtomicProductSectionVisual,
AtomicProductTemplate,
AtomicProductText,
AtomicQueryError,
AtomicQuerySummary,
AtomicQuickview,
AtomicQuickviewModal,
AtomicRatingFacet,
AtomicRatingRangeFacet,
AtomicRecsError,
AtomicRecsInterface,
AtomicRecsList,
AtomicRecsResult,
AtomicRecsResultTemplate,
AtomicRefineModal,
AtomicRefineToggle,
AtomicRelevanceInspector,
AtomicResult,
AtomicResultBadge,
AtomicResultChildren,
AtomicResultChildrenTemplate,
AtomicResultDate,
AtomicResultFieldsList,
AtomicResultHtml,
AtomicResultIcon,
AtomicResultImage,
AtomicResultLink,
AtomicResultList,
AtomicResultLocalizedText,
AtomicResultMultiValueText,
AtomicResultNumber,
AtomicResultPrintableUri,
AtomicResultRating,
AtomicResultSectionActions,
AtomicResultSectionBadges,
AtomicResultSectionBottomMetadata,
AtomicResultSectionChildren,
AtomicResultSectionEmphasized,
AtomicResultSectionExcerpt,
AtomicResultSectionTitle,
AtomicResultSectionTitleMetadata,
AtomicResultSectionVisual,
AtomicResultTemplate,
AtomicResultText,
AtomicResultTimespan,
AtomicResultsPerPage,
AtomicSearchBox,
AtomicSearchBoxInstantResults,
AtomicSearchBoxQuerySuggestions,
AtomicSearchBoxRecentQueries,
AtomicSearchInterface,
AtomicSearchLayout,
AtomicSegmentedFacet,
AtomicSegmentedFacetScrollable,
AtomicSmartSnippet,
AtomicSmartSnippetFeedbackModal,
AtomicSmartSnippetSuggestions,
AtomicSortDropdown,
AtomicSortExpression,
AtomicTabManager,
AtomicTableElement,
AtomicText,
AtomicTimeframe,
AtomicTimeframeFacet
]

        
const shimTemplates = ()=> {
  // Angular's renderer will add children to a <template> instead of to its
  // content. This shim will force any children added to a <template> to be
  // added to its content instead.
  // https://github.com/angular/angular/issues/15557
  const nativeAppend = HTMLTemplateElement && HTMLTemplateElement.prototype && HTMLTemplateElement.prototype.appendChild;
  if(!nativeAppend) {
    return;
  }
  HTMLTemplateElement.prototype.appendChild = function<T extends Node>(
    childNode: T
  ) {
    if (this.content) {
      return this.content.appendChild(childNode);
    } else {
      return <T>nativeAppend.apply(this, [childNode]);
    }
  };
}

        
const SHIM_TEMPLATES_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  useValue: shimTemplates
}

        
@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  providers: [SHIM_TEMPLATES_PROVIDER],
  imports: [CommonModule],
})
export class AtomicAngularModule {
  static forRoot(): ModuleWithProviders<AtomicAngularModule> {
    return {
      ngModule: AtomicAngularModule,
      providers: [],
    };
  }
}

        