import {createTestI18n} from '@/vitest-utils/i18n-utils';
import {PaginationState} from '@coveo/headless/commerce';
import * as headless from '@coveo/headless/commerce';
import '@vitest/browser/matchers.d.ts';
import {describe, test, vi, expect, beforeEach, afterEach} from 'vitest';
import {CommerceBindings} from '../atomic-commerce-interface/atomic-commerce-interface';
import {CommerceStore} from '../atomic-commerce-interface/store';
import './atomic-commerce-pager';
import {AtomicCommercePager} from './atomic-commerce-pager';

vi.mock('@coveo/headless/commerce', () => {
  return {
    buildProductListing: vi.fn(() => {
      return {
        pagination: vi.fn(() => ({
          previousPage: vi.fn(),
          selectPage: vi.fn(),
          nextPage: vi.fn(),
        })),
      };
    }),
    buildSearch: vi.fn(() => {
      return {
        pagination: vi.fn(() => ({
          previousPage: vi.fn(),
          selectPage: vi.fn(),
          nextPage: vi.fn(),
        })),
      };
    }),
  };
});

describe('AtomicCommercePager', () => {
  let element: AtomicCommercePager;

  describe('when initializing', () => {
    beforeEach(async () => {
      element = await renderPager();
    });

    afterEach(() => {
      document.body.removeChild(element);
    });

    test('should validate props', () => {
      const validatePropsSpy = vi.spyOn(element, 'validateProps');
      element.initialize();
      expect(validatePropsSpy).toHaveBeenCalled();
    });

    test('should call buildProductListing with engine when interfaceElement.type is product-listing', () => {
      const buildProductListingMock = vi.spyOn(headless, 'buildProductListing');

      element.bindings.interfaceElement.type = 'product-listing';
      element.initialize();

      expect(buildProductListingMock).toHaveBeenCalledWith(
        element.bindings.engine
      );
    });

    test('should call buildSearch with engine when interfaceElement.type is search', () => {
      const buildSearchMock = vi.spyOn(headless, 'buildSearch');

      element.bindings.interfaceElement.type = 'search';
      element.initialize();

      expect(buildSearchMock).toHaveBeenCalledWith(element.bindings.engine);
    });
  });

  describe('when rendering', () => {
    afterEach(() => {
      // document.body.removeChild(element);
    });

    test('should show the proper page range', async () => {
      element = await renderPager();
    });

    test('number-of-pages should affect the range of pages', async () => {
      element = await renderPager();
    });

    test('should render an error when numberOfPages is less than 0', async () => {
      element = await renderPager(undefined, -1);
    });

    test('previous-button-icon should render the proper icon', async () => {
      element = await renderPager();
    });

    test('next-button-icon should render the proper icon', async () => {
      element = await renderPager();
    });

    test('should not render when there are no pages', async () => {
      element = await renderPager();
    });

    test('should disable the previous button when on the first page', async () => {
      element = await renderPager();
    });

    test('should call focusOnFirstResultAndScrollToTop when clicking on the previous button', async () => {
      element = await renderPager();
    });

    test('should call previousPage when clicking on the previous button', async () => {
      element = await renderPager();
    });

    test('should call focusOnFirstResultAndScrollToTop when clicking on the next button', async () => {
      element = await renderPager();
    });

    test('should call nextPage when clicking on the next button', async () => {
      element = await renderPager();
    });

    test('should disable the next button when on the last page', async () => {
      element = await renderPager();
    });

    test('should localize the aria-label on the page buttons', async () => {
      element = await renderPager();
    });

    test('should render the proper text on the page buttons', async () => {
      element = await renderPager();
    });

    test('should select the page button when clicked', async () => {
      element = await renderPager();
    });

    test('should call selectPage when clicking on a page button', async () => {
      element = await renderPager();
    });

    test('should call focusOnFirstResultAndScrollToTop when clicking on a page button', async () => {
      element = await renderPager();
    });
  });
});

async function renderPager(
  mockedState: PaginationState = {
    page: 0,
    totalPages: 10,
    pageSize: 10,
    totalEntries: 100,
  },
  numberOfPages?: number
) {
  const pager = document.createElement(
    'atomic-commerce-pager'
  ) as AtomicCommercePager;

  if (numberOfPages !== undefined) {
    pager.setAttribute('number-of-pages', numberOfPages.toString());
  }

  document.body.appendChild(pager);

  await addMockedState(pager, mockedState);
  await addMockedBindings(pager);
  //@ts-expect-error - manually setting up this private property since a mocked implementation of createAppLoadedListener created problems
  pager.isAppLoaded = true;
  pager.initialize();

  return pager;
}

async function addMockedBindings(element: AtomicCommercePager) {
  const i18nTest = await createTestI18n();
  element.bindings = {
    store: {
      state: {
        resultList: {
          focusOnFirstResultAfterNextSearch: () => {},
        },
      },
    } as CommerceStore,
    i18n: i18nTest,
    interfaceElement: {
      type: 'product-listing',
    } as HTMLAtomicCommerceInterfaceElement,
  } as CommerceBindings;
}

async function addMockedState(
  element: AtomicCommercePager,
  state: PaginationState
) {
  element.pagerState = state;
}
