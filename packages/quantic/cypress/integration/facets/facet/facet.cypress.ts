import {configure} from '../../../page-objects/configurator';

import {FacetSelectors} from './facet-selectors';
import {FacetExpectations as Expect} from './facet-expectations';
import {
  extractFacetValues,
  InterceptAliases,
  interceptSearch,
} from '../../../page-objects/search';
import {
  checkFirstValue,
  checkLastValue,
  selectFirstLinkValue,
  selectLastLinkValue,
} from './facet-actions';

interface FacetOptions {
  field: string;
  label: string;
  numberOfValues: number;
  sortCriteria: string;
  noSearch: boolean;
  isCollapsed: boolean;
  displayValuesAs: string;
}

describe('Facet Test Suite', () => {
  const pageUrl = 's/quantic-facet';

  const defaultField = 'objecttype';
  const defaultLabel = 'Type';
  const defaultNumberOfValues = 8;

  function visitFacetPage(options: Partial<FacetOptions> = {}) {
    interceptSearch();

    cy.visit(pageUrl);
    configure(options);
  }

  function loadFromUrlHash(
    options: Partial<FacetOptions> = {},
    urlHash: string
  ) {
    interceptSearch();

    cy.visit(`${pageUrl}#${urlHash}`);
    configure(options);
  }

  describe('with values', () => {
    const indexFacetValuesAlias = '@indexFacetValues';
    function aliasFacetValues() {
      cy.wait(InterceptAliases.Search).then((interception) => {
        const indexValues = extractFacetValues(interception.response);
        cy.wrap(indexValues).as(indexFacetValuesAlias.substring(1));
      });
    }

    function setupWithValues() {
      visitFacetPage({
        field: defaultField,
        label: defaultLabel,
        numberOfValues: defaultNumberOfValues,
      });
      aliasFacetValues();
    }

    describe('verify rendering', () => {
      before(setupWithValues);

      Expect.facetValuesEqual(indexFacetValuesAlias);
      Expect.labelContains(defaultLabel);
      Expect.displayValues(true);
      Expect.numberOfSelectedCheckboxValues(0);
      Expect.numberOfIdleCheckboxValues(defaultNumberOfValues);
      Expect.displayClearButton(false);
      Expect.displayShowMoreButton(true);
      Expect.displayShowLessButton(false);
      Expect.displaySearchInput(true);
    });

    describe('when selecting a value', () => {
      function selectFirstFacetValue() {
        setupWithValues();
        checkFirstValue(FacetSelectors);
      }

      function collapseFacet() {
        FacetSelectors.collapseButton().click();
      }

      describe('verify rendering', () => {
        before(selectFirstFacetValue);

        Expect.clearFilterContains('Clear filter');
        Expect.numberOfSelectedCheckboxValues(1);
        Expect.numberOfIdleCheckboxValues(defaultNumberOfValues - 1);
      });

      describe('verify analytics', () => {
        before(selectFirstFacetValue);

        Expect.logFacetSelect(defaultField, 0);
      });

      describe('when collapsing the facet', () => {
        before(() => {
          selectFirstFacetValue();
          collapseFacet();
        });

        describe('verify rendering', () => {
          Expect.displayClearButton(true);
          Expect.clearFilterContains('Clear filter');
        });
      });

      describe('when selecting the "Clear" button', () => {
        function clearSelectedValues() {
          selectFirstFacetValue();
          FacetSelectors.clearFilterButton().click();
        }

        describe('verify rendering', () => {
          before(clearSelectedValues);

          Expect.displayClearButton(false);
          Expect.numberOfSelectedCheckboxValues(0);
          Expect.numberOfIdleCheckboxValues(defaultNumberOfValues);
        });

        describe('verify analytics', () => {
          before(clearSelectedValues);

          Expect.logClearFacetValues(defaultField);
        });
      });

      describe('when selecting a second value', () => {
        const initialNumberOfSelectedValues = 2;
        function selectLastFacetValue() {
          selectFirstFacetValue();
          cy.wait(InterceptAliases.UA.Facet.Select);

          checkLastValue(FacetSelectors);
        }

        describe('verify rendering', () => {
          before(selectLastFacetValue);

          Expect.clearFilterContains('Clear 2 filters');
          Expect.numberOfSelectedCheckboxValues(initialNumberOfSelectedValues);
          Expect.numberOfIdleCheckboxValues(
            defaultNumberOfValues - initialNumberOfSelectedValues
          );
        });

        describe('verify analytics', () => {
          before(selectLastFacetValue);

          Expect.logFacetSelect(defaultField, 1);
        });

        describe('when collapsing the facet', () => {
          before(() => {
            selectLastFacetValue();
            collapseFacet();
          });

          describe('verify rendering', () => {
            Expect.displayClearButton(true);
            Expect.clearFilterContains('Clear 2 filters');
          });
        });
      });
    });

    describe('when searching for a value that returns results', () => {
      const query = 'a';

      function searchForValue() {
        setupWithValues();
        FacetSelectors.searchInput().type(query);
      }

      function searchForSingleValue() {
        setupWithValues();
        const singleValueQuery = 'account';
        FacetSelectors.searchInput().type(singleValueQuery);
        for (let i = 0; i < singleValueQuery.length; i++) {
          cy.wait(InterceptAliases.FacetSearch);
        }
      }

      describe('verify rendering', () => {
        before(searchForValue);

        Expect.numberOfIdleCheckboxValues(defaultNumberOfValues);
        Expect.numberOfSelectedCheckboxValues(0);
        Expect.displayMoreMatchesFound(true);
        Expect.displayNoMatchesFound(false);
        Expect.moreMatchesFoundContainsQuery(query);
        Expect.displayShowMoreButton(false);
        Expect.displaySearchClearButton(true);
        Expect.highlightsResults(query);
      });

      describe('when clearing the facet search results', () => {
        function clearSearchInput() {
          searchForValue();
          FacetSelectors.searchClearButton().click();
        }

        describe('verify rendering', () => {
          before(clearSearchInput);

          Expect.numberOfIdleCheckboxValues(defaultNumberOfValues);
          Expect.numberOfSelectedCheckboxValues(0);
          Expect.displayMoreMatchesFound(false);
          Expect.displayNoMatchesFound(false);
          Expect.displayShowMoreButton(true);
          Expect.displayShowLessButton(false);
          Expect.searchInputEmpty();
          Expect.displaySearchClearButton(false);
        });
      });

      describe('verify analytics', () => {
        before(searchForValue);

        Expect.logFacetSearch(defaultField);
      });

      describe('when selecting a search result', () => {
        function selectSearchResult() {
          searchForSingleValue();
          checkFirstValue(FacetSelectors);
        }

        describe('verify rendering', () => {
          before(selectSearchResult);

          Expect.numberOfIdleCheckboxValues(defaultNumberOfValues - 1);
          Expect.numberOfSelectedCheckboxValues(1);
          Expect.displayMoreMatchesFound(false);
          Expect.displayNoMatchesFound(false);
          Expect.displayShowMoreButton(true);
          Expect.displaySearchInput(true);
          Expect.displaySearchClearButton(false);
        });

        describe('verify analytics', () => {
          before(selectSearchResult);

          Expect.logFacetSelect(defaultField, 0);
        });
      });

      describe('when searching for a value that returns a single result', () => {
        describe('verify rendering', () => {
          before(searchForSingleValue);

          Expect.numberOfIdleCheckboxValues(1);
          Expect.numberOfSelectedCheckboxValues(0);
          Expect.displayMoreMatchesFound(false);
          Expect.displayNoMatchesFound(false);
          Expect.displaySearchClearButton(true);
        });
      });

      describe('when searching for a value that returns no results', () => {
        const query = 'this facet value does not exist';

        function searchForInvalidValue() {
          setupWithValues();
          FacetSelectors.searchInput().type(query);
        }

        describe('verify rendering', () => {
          before(searchForInvalidValue);

          Expect.numberOfIdleCheckboxValues(0);
          Expect.numberOfSelectedCheckboxValues(0);
          Expect.displayMoreMatchesFound(false);
          Expect.displayNoMatchesFound(true);
          Expect.noMatchesFoundContainsQuery(query);
          Expect.displaySearchClearButton(true);
        });
      });
    });

    describe('show more/less values', () => {
      describe('when facet has no more values', () => {
        function showAllValues() {
          visitFacetPage({
            field: defaultField,
            label: defaultLabel,
            numberOfValues: 1000,
          });
          cy.wait(InterceptAliases.Search);
        }

        describe('verify rendering', () => {
          before(showAllValues);

          Expect.displayShowMoreButton(false);
          Expect.displayShowLessButton(false);
        });
      });

      describe('when clicking show more values', () => {
        const smallNumberOfValues = 2;

        function showMoreValues() {
          visitFacetPage({
            field: defaultField,
            label: defaultLabel,
            numberOfValues: smallNumberOfValues,
          });
          cy.wait(InterceptAliases.Search);
          FacetSelectors.showMoreButton().click();
          aliasFacetValues();
        }

        describe('verify rendering', () => {
          before(showMoreValues);

          Expect.facetValuesEqual(indexFacetValuesAlias);
          Expect.numberOfValues(smallNumberOfValues * 2);
        });

        describe('when clicking show more button again', () => {
          function showMoreValuesAgain() {
            showMoreValues();
            FacetSelectors.showMoreButton().click();
            aliasFacetValues();
          }

          describe('verify rendering', () => {
            before(showMoreValuesAgain);

            Expect.facetValuesEqual(indexFacetValuesAlias);
            Expect.numberOfValues(smallNumberOfValues * 3);
          });

          describe('when clicking show less button', () => {
            function showLessValues() {
              showMoreValuesAgain();
              FacetSelectors.showLessButton().click();
              aliasFacetValues();
            }

            describe('verify rendering', () => {
              before(showLessValues);

              Expect.facetValuesEqual(indexFacetValuesAlias);
              Expect.numberOfValues(smallNumberOfValues);
            });
          });
        });
      });
    });

    describe('when collapsing a facet', () => {
      function collapseFacet() {
        setupWithValues();
        FacetSelectors.collapseButton().click();
      }

      describe('verify rendering', () => {
        before(collapseFacet);

        Expect.labelContains(defaultLabel);
        Expect.displayExpandButton(true);
        Expect.displaySearchInput(false);
        Expect.numberOfIdleCheckboxValues(0);
        Expect.displayShowMoreButton(false);
      });

      describe('when expanding a facet', () => {
        function expandFacet() {
          collapseFacet();
          FacetSelectors.expandButton().click();
        }

        describe('verify rendering', () => {
          before(expandFacet);

          Expect.labelContains(defaultLabel);
          Expect.displayCollapseButton(true);
          Expect.displaySearchInput(true);
          Expect.numberOfIdleCheckboxValues(defaultNumberOfValues);
          Expect.displayShowMoreButton(true);
        });
      });
    });
  });

  describe('with link values', () => {
    function setupWithLinkValues() {
      visitFacetPage({
        field: defaultField,
        label: defaultLabel,
        displayValuesAs: 'link',
      });
    }

    describe('verify rendering', () => {
      before(setupWithLinkValues);

      Expect.labelContains(defaultLabel);
      Expect.displayValues(true);
      Expect.hasCheckbox(false);
      Expect.numberOfSelectedLinkValues(0);
      Expect.numberOfIdleLinkValues(defaultNumberOfValues);
      Expect.displayClearButton(false);
      Expect.displayShowMoreButton(true);
      Expect.displayShowLessButton(false);
      Expect.displaySearchInput(true);
    });

    describe('when selecting a value', () => {
      function selectFirstFacetValue() {
        setupWithLinkValues();
        selectFirstLinkValue(FacetSelectors);
      }

      function collapseFacet() {
        FacetSelectors.collapseButton().click();
      }

      describe('verify rendering', () => {
        before(selectFirstFacetValue);

        Expect.clearFilterContains('Clear filter');
        Expect.numberOfSelectedLinkValues(1);
        Expect.numberOfIdleLinkValues(defaultNumberOfValues - 1);
      });

      describe('verify analytics', () => {
        before(selectFirstFacetValue);

        Expect.logFacetSelect(defaultField, 0);
      });

      describe('when collapsing the facet', () => {
        before(() => {
          selectFirstFacetValue();
          collapseFacet();
        });

        describe('verify rendering', () => {
          Expect.displayClearButton(true);
          Expect.clearFilterContains('Clear filter');
        });
      });

      describe('when selecting the "Clear" button', () => {
        function clearSelectedValues() {
          selectFirstFacetValue();
          FacetSelectors.clearFilterButton().click();
        }

        describe('verify rendering', () => {
          before(clearSelectedValues);

          Expect.displayClearButton(false);
          Expect.numberOfSelectedLinkValues(0);
          Expect.numberOfIdleLinkValues(defaultNumberOfValues);
        });

        describe('verify analytics', () => {
          before(clearSelectedValues);

          Expect.logClearFacetValues(defaultField);
        });
      });

      describe('when selecting a second value', () => {
        function selectLastFacetValue() {
          selectFirstFacetValue();
          cy.wait(InterceptAliases.UA.Facet.Select);

          selectLastLinkValue(FacetSelectors);
        }

        describe('verify rendering', () => {
          before(selectLastFacetValue);

          Expect.clearFilterContains('Clear filter');
          Expect.numberOfSelectedLinkValues(1);
          Expect.numberOfIdleLinkValues(defaultNumberOfValues - 1);
        });

        describe('verify analytics', () => {
          before(selectLastFacetValue);

          Expect.logFacetSelect(defaultField, 0);
        });

        describe('when collapsing the facet', () => {
          before(() => {
            selectLastFacetValue();
            collapseFacet();
          });

          describe('verify rendering', () => {
            Expect.clearFilterContains('Clear filter');
          });
        });
      });
    });
  });

  describe('with custom field, label, and number of results', () => {
    function setupCustomOptions() {
      visitFacetPage({
        field: 'language',
        label: 'Language',
        numberOfValues: 3,
      });
    }

    describe('verify rendering', () => {
      before(setupCustomOptions);

      Expect.labelContains('Language');
      Expect.facetValueContains('English');
      Expect.numberOfIdleCheckboxValues(3);
    });
  });

  describe('when field returns no results', () => {
    before(() => {
      visitFacetPage({
        field: 'somethingthatdoesnotexist',
      });
      cy.wait(InterceptAliases.Search);
    });

    Expect.displayLabel(false);
  });

  describe('with custom sorting', () => {
    ['automatic', 'score', 'alphanumeric', 'occurrences'].forEach((sorting) => {
      it(`should use "${sorting}" sorting in the facet request`, () => {
        visitFacetPage({
          sortCriteria: sorting,
        });
        cy.wait(InterceptAliases.Search).then((interception) => {
          const facetRequest = interception.request.body.facets[0];
          expect(facetRequest.sortCriteria).to.eq(sorting);
        });
      });
    });
  });

  describe('with invalid sorting', () => {
    before(() => {
      visitFacetPage({
        sortCriteria: 'invalid',
      });
    });

    Expect.displayLabel(false);
  });

  describe('with no search', () => {
    function setupNoSearch() {
      visitFacetPage({
        noSearch: true,
      });
    }

    describe('verify rendering', () => {
      before(setupNoSearch);

      Expect.displaySearchInput(false);
    });
  });

  describe('with is collapsed', () => {
    function setupIsCollapsed() {
      visitFacetPage({
        isCollapsed: true,
      });
    }

    describe('verify rendering', () => {
      before(setupIsCollapsed);

      Expect.labelContains(defaultLabel);
      Expect.displayExpandButton(true);
      Expect.displaySearchInput(false);
      Expect.numberOfIdleCheckboxValues(0);
      Expect.displayShowMoreButton(false);
    });
  });

  describe('with a selected value in the URL', () => {
    const selectedValue = 'Account';

    function loadWithSelectedValue() {
      loadFromUrlHash(
        {
          field: defaultField,
        },
        `f[objecttype]=${selectedValue}`
      );
    }

    describe('verify rendering', () => {
      before(loadWithSelectedValue);

      Expect.numberOfSelectedCheckboxValues(1);
      Expect.numberOfIdleCheckboxValues(defaultNumberOfValues - 1);
      Expect.selectedCheckboxValuesContain(selectedValue);
    });
  });
});
