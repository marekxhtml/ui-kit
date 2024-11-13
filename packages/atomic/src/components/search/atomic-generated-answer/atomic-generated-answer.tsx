import {
  SearchStatus,
  SearchStatusState,
  buildSearchStatus,
  buildGeneratedAnswer,
  GeneratedAnswer,
  GeneratedAnswerState,
  buildInteractiveCitation,
  buildTabManager,
  TabManagerState,
  TabManager,
} from '@coveo/headless';
import {Component, Element, State, Prop, Watch, h} from '@stencil/core';
import {AriaLiveRegion} from '../../../utils/accessibility-utils';
import {debounce} from '../../../utils/debounce-utils';
import {
  BindStateToController,
  InitializableComponent,
  InitializeBindings,
} from '../../../utils/initialization-utils';
import {ArrayProp} from '../../../utils/props-utils';
import {shouldDisplayOnCurrentTab} from '../../../utils/tab-utils';
import {GeneratedAnswerCommon} from '../../common/generated-answer/generated-answer-common';
import {Hidden} from '../../common/hidden';
import {Bindings} from '../atomic-search-interface/atomic-search-interface';

/**
 * The `atomic-generated-answer` component uses Coveo Machine Learning (Coveo ML) models to automatically generate an answer to a query executed by the user.
 * For more information, see [About Relevance Generative Answering (RGA)](https://docs.coveo.com/en/n9de0370/)
 *
 * @part container - The container displaying the generated answer.
 * @part header-label - The header of the generated answer container.
 * @part feedback-button - The "like" and "dislike" buttons.
 * @part toggle - The switch to toggle the visibility of the generated answer.
 * @part copy-button - The "Copy answer" button.
 * @part retry-container - The container for the "retry" section.
 * @part generated-text - The text of the generated answer.
 * @part citations-label - The header of the citations list.
 *
 * @part answer-code-block - The generated answer multi-line code blocks.
 * @part answer-emphasis - The generated answer emphasized text elements.
 * @part answer-inline-code - The generated answer inline code elements.
 * @part answer-heading-1 - The generated answer level 1 heading elements.
 * @part answer-heading-2 - The generated answer level 2 heading elements.
 * @part answer-heading-3 - The generated answer level 3 heading elements.
 * @part answer-heading-4 - The generated answer level 4 heading elements.
 * @part answer-heading-5 - The generated answer level 5 heading elements.
 * @part answer-heading-6 - The generated answer level 6 heading elements.
 * @part answer-list-item - The generated answer list item elements for both ordered and unordered lists.
 * @part answer-ordered-list - The generated answer ordered list elements.
 * @part answer-paragraph - The generated answer paragraph elements.
 * @part answer-quote-block - The generated answer quote block elements.
 * @part answer-unordered-list - The generated answer unordered list elements.
 * @part answer-strong - The generated answer strong text elements.
 * @part answer-table - The generated answer table elements.
 * @part answer-table-container - The generated answer table container elements.
 * @part answer-table-content - The generated answer table content cell elements.
 * @part answer-table-header - The generated answer table header cell elements.
 *
 * @part citation - The link that allows the user to navigate to the item.
 * @part citation-popover - The pop-up that shows an item preview when the user hovers over the citation.
 */
@Component({
  tag: 'atomic-generated-answer',
  styleUrl: 'atomic-generated-answer.pcss',
  shadow: true,
})
export class AtomicGeneratedAnswer implements InitializableComponent {
  @InitializeBindings() public bindings!: Bindings;
  public generatedAnswer!: GeneratedAnswer;
  public searchStatus!: SearchStatus;
  private resizeObserver?: ResizeObserver;

  @BindStateToController('generatedAnswer', {
    onUpdateCallbackMethod: 'onGeneratedAnswerStateUpdate',
  })
  @State()
  private generatedAnswerState!: GeneratedAnswerState;

  @BindStateToController('searchStatus')
  @State()
  private searchStatusState!: SearchStatusState;

  public tabManager!: TabManager;

  @BindStateToController('tabManager')
  @State()
  public tabManagerState!: TabManagerState;

  @State()
  public error!: Error;

  @Element() private host!: HTMLElement;

  @State()
  copied = false;

  @State()
  copyError = false;

  /**
   * Whether to render a toggle button that lets the user hide or show the answer.
   * @default false
   */
  @Prop() withToggle?: boolean;

  /**
   * Whether to allow the answer to be collapsed when the text is taller than the specified `--atomic-crga-collapsed-height` value (16rem by default).
   * @default false
   */
  @Prop() collapsible?: boolean;

  /**
   * @internal
   * The unique identifier of the answer configuration to use to generate the answer.
   */
  @Prop() answerConfigurationId?: string;

  /**
   * The tabs on which the generated answer can be displayed. This property should not be used at the same time as `tabs-excluded`.
   *
   * Set this property as a stringified JSON array, e.g.,
   * ```html
   *  <atomic-generated-answer tabs-included='["tabIDA", "tabIDB"]'></atomic-generated-answer>
   * ```
   * If you don't set this property, the generated answer can be displayed on any tab. Otherwise, the generated answer can only be displayed on the specified tabs.
   */
  @ArrayProp()
  @Prop({reflect: true, mutable: true})
  public tabsIncluded: string[] | string = '[]';

  /**
   * The tabs on which this generated answer must not be displayed. This property should not be used at the same time as `tabs-included`.
   *
   * Set this property as a stringified JSON array, e.g.,
   * ```html
   *  <atomic-generated-answer tabs-excluded='["tabIDA", "tabIDB"]'></atomic-generated-answer>
   * ```
   * If you don't set this property, the generated answer can be displayed on any tab. Otherwise, the generated answer won't be displayed on any of the specified tabs.
   */
  @ArrayProp()
  @Prop({reflect: true, mutable: true})
  public tabsExcluded: string[] | string = '[]';

  @AriaLiveRegion('generated-answer')
  protected ariaMessage!: string;

  private generatedAnswerCommon!: GeneratedAnswerCommon;
  private fullAnswerHeight?: number;
  private maxCollapsedHeight = 250;

  public initialize() {
    if (
      [...this.tabsIncluded].length > 0 &&
      [...this.tabsExcluded].length > 0
    ) {
      console.warn(
        'Values for both "tabs-included" and "tabs-excluded" have been provided. This could lead to unexpected behaviors.'
      );
    }
    this.generatedAnswerCommon = new GeneratedAnswerCommon({
      host: this.host,
      withToggle: this.withToggle,
      collapsible: this.collapsible,
      getGeneratedAnswer: () => this.generatedAnswer,
      getGeneratedAnswerState: () => this.generatedAnswerState,
      getSearchStatusState: () => this.searchStatusState,
      getBindings: () => this.bindings,
      getCopied: () => this.copied,
      setCopied: this.setCopied,
      getCopyError: () => this.copyError,
      setCopyError: this.setCopyError,
      setAriaMessage: this.setAriaMessage,
      buildInteractiveCitation: (props) =>
        buildInteractiveCitation(this.bindings.engine, props),
    });
    this.generatedAnswer = buildGeneratedAnswer(this.bindings.engine, {
      initialState: {
        isVisible: this.generatedAnswerCommon.data.isVisible,
        responseFormat: {
          contentFormat: ['text/markdown', 'text/plain'],
        },
      },
      ...(this.answerConfigurationId && {
        answerConfigurationId: this.answerConfigurationId,
      }),
    });
    this.searchStatus = buildSearchStatus(this.bindings.engine);
    this.generatedAnswerCommon.insertFeedbackModal();

    if (window.ResizeObserver && this.collapsible) {
      const debouncedAdaptAnswerHeight = debounce(
        () => this.adaptAnswerHeight(),
        100
      );
      this.resizeObserver = new ResizeObserver(debouncedAdaptAnswerHeight);
      this.resizeObserver.observe(this.host);
    }
    this.tabManager = buildTabManager(this.bindings.engine);
  }

  @Watch('generatedAnswerState')
  public updateAnswerCollapsed(
    newState: GeneratedAnswerState,
    oldState: GeneratedAnswerState
  ) {
    const newExpanded = newState.expanded;
    const oldExpanded = oldState ? oldState.expanded : undefined;

    if (newExpanded !== oldExpanded) {
      const container = this.getAnswerContainer();

      if (!container) {
        return;
      }

      this.toggleClass(container, 'answer-collapsed', !newExpanded);
    }
  }

  public disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  // @ts-expect-error: This function is used by BindStateToController.
  private onGeneratedAnswerStateUpdate = () => {
    if (
      this.generatedAnswerState.isVisible !==
      this.generatedAnswerCommon?.data?.isVisible
    ) {
      this.generatedAnswerCommon.data = {
        ...this.generatedAnswerCommon.data,
        isVisible: this.generatedAnswerState.isVisible,
      };
      this.generatedAnswerCommon.writeStoredData(
        this.generatedAnswerCommon.data
      );
    }

    this.setAriaMessage(this.generatedAnswerCommon.getGeneratedAnswerStatus());
  };

  private setCopied = (isCopied: boolean) => {
    this.copied = isCopied;
  };

  private setCopyError = (copyError: boolean) => {
    this.copyError = copyError;
  };

  private setAriaMessage = (message: string) => {
    this.ariaMessage = message;
  };

  private toggleClass(element: Element, className: string, condition: boolean) {
    element.classList.toggle(className, condition);
  }

  private adaptAnswerHeight() {
    this.fullAnswerHeight = this.host?.shadowRoot
      ?.querySelector('[part="generated-text"]')
      ?.getBoundingClientRect().height;
    this.updateAnswerHeight();
  }

  private getAnswerContainer() {
    return this.host?.shadowRoot?.querySelector('[part="generated-container"]');
  }

  private getAnswerFooter() {
    return this.host?.shadowRoot?.querySelector(
      '[part="generated-answer-footer"]'
    );
  }

  private updateAnswerHeight() {
    const container = this.getAnswerContainer();
    const footer = this.getAnswerFooter();

    if (!container || !footer) {
      return;
    }

    if (this.fullAnswerHeight! > this.maxCollapsedHeight) {
      this.toggleClass(
        container,
        'answer-collapsed',
        !this.generatedAnswerState.expanded
      );
      this.toggleClass(footer, 'is-collapsible', true);
      this.toggleClass(
        footer,
        'generating-label-visible',
        this.generatedAnswerState.isStreaming
      );
    } else {
      this.toggleClass(container, 'answer-collapsed', false);
      this.toggleClass(footer, 'is-collapsible', false);
      this.toggleClass(footer, 'generating-label-visible', false);
    }
  }

  @Watch('tabManagerState')
  watchTabManagerState(
    newValue: {activeTab: string},
    oldValue: {activeTab: string}
  ) {
    if (newValue?.activeTab !== oldValue?.activeTab) {
      if (
        !shouldDisplayOnCurrentTab(
          [...this.tabsIncluded],
          [...this.tabsExcluded],
          this.tabManagerState?.activeTab
        )
      ) {
        this.generatedAnswer.disable();
      } else {
        this.generatedAnswer.enable();
      }
    }
  }

  public render() {
    if (
      !shouldDisplayOnCurrentTab(
        [...this.tabsIncluded],
        [...this.tabsExcluded],
        this.tabManagerState?.activeTab
      )
    ) {
      return <Hidden />;
    }
    return this.generatedAnswerCommon.render();
  }
}
