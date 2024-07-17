import {
  ProductTemplate,
  ProductTemplateCondition,
} from '@coveo/headless/commerce';
import {Component, Element, Prop, Method, State} from '@stencil/core';
import {MapProp} from '../../../utils/props-utils';
import {
  ProductTemplateCommon,
  makeMatchConditions,
} from './product-template-common';

/**
 * @alpha
 */
@Component({
  tag: 'atomic-product-template',
  shadow: true,
})
export class AtomicProductTemplate {
  private productTemplateCommon: ProductTemplateCommon;

  @State() public error!: Error;

  @Element() public host!: HTMLDivElement;

  /**
   * A function that must return true on products for the product template to apply.
   * Set programmatically before initialization, not via attribute.
   *
   * For example, the following targets a template and sets a condition to make it apply only to products whose `ec_name` contains `singapore`:
   * `document.querySelector('#target-template').conditions = [(product) => /singapore/i.test(product.ec_name)];`
   */
  @Prop() public conditions: ProductTemplateCondition[] = [];

  /**
   * The field and values that define which result items the condition must be applied to. For example, a template with the following attribute
   * only applies to result items whose `filetype` is `lithiummessage` or `YouTubePlaylist`: `must-match-filetype="lithiummessage,YouTubePlaylist"
   * `;type: Record<string, string[]> ;default: {}
   */
  @Prop() @MapProp({splitValues: true}) public mustMatch: Record<
    string,
    string[]
  > = {};

  /**
   * The field and values that define which result items the condition must not be applied to. For example, a template with the following attribute
   * only applies to result items whose `filetype` is not `lithiummessage`: `must-not-match-filetype="lithiummessage";type: Record<string, string[]> ;default: {}
   */
  @Prop() @MapProp({splitValues: true}) public mustNotMatch: Record<
    string,
    string[]
  > = {};

  constructor() {
    this.productTemplateCommon = new ProductTemplateCommon({
      host: this.host,
      setError: (err) => {
        this.error = err;
      },
      validParents: [
        'atomic-commerce-product-list',
        'atomic-commerce-recommendation-list',
        'atomic-commerce-search-box-instant-products',
      ],
      allowEmpty: true,
    });
  }

  public componentWillLoad() {
    this.productTemplateCommon.matchConditions = makeMatchConditions(
      this.mustMatch,
      this.mustNotMatch
    );
  }

  /**
   * Gets the product template to apply based on the evaluated conditions.
   */
  @Method()
  public async getTemplate(): Promise<ProductTemplate<DocumentFragment> | null> {
    return this.productTemplateCommon.getTemplate(this.conditions, this.error);
  }

  public render() {
    return this.productTemplateCommon.renderIfError(this.error);
  }
}
