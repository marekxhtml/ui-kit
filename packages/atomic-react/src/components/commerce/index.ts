export * from '../stencil-generated/commerce/components';
export * from '@coveo/headless/commerce';
export type {CommerceBindings, i18n} from '@coveo/atomic';

// Important: Re-exporting under the same name (eg: "AtomicCommerceInterface") shadows the original component
// and should wrap it nicely for users of the library
export {InterfaceWrapper as AtomicCommerceInterface} from './CommerceInterfaceWrapper';
export {ListWrapper as AtomicCommerceProductList} from './CommerceProductListWrapper';
export {ListWrapper as AtomicCommerceRecommendationList} from './CommerceRecommendationListWrapper';
