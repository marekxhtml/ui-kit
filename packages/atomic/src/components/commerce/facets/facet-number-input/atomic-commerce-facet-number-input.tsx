import {isUndefined} from '@coveo/bueno';
import {NumericFacet} from '@coveo/headless/commerce';
import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  State,
  Element,
} from '@stencil/core';
import {Twind} from '@twind/core';
import {adoptStyles} from '../../../../utils/adoptedStyleSheets-utils';
import {getTwind} from '../../../../utils/twind';
import {Button} from '../../../common/button';
import {CommerceBindings as Bindings} from '../../atomic-commerce-interface/atomic-commerce-interface';
import css from './atomic-commerce-facet-number-input.css';

export type Range = {start: number; end: number};

/**
 * Internal component made to be integrated in a NumericFacet.
 * @alpha
 */
@Component({
  tag: 'atomic-commerce-facet-number-input',
  shadow: true,
})
export class FacetNumberInput {
  private startRef!: HTMLInputElement;
  private endRef!: HTMLInputElement;

  @Element() private host!: HTMLElement;

  @State() private start?: number;
  @State() private end?: number;

  @Prop() public bindings!: Bindings;
  @Prop() public label!: string;
  @Prop() public range?: Range;
  @Prop() public facet!: NumericFacet;

  @Event({
    eventName: 'atomic/numberInputApply',
  })
  private applyInput!: EventEmitter;
  private twind!: Twind;
  twOnConnected: (element: HTMLElement) => void;
  twOnDisconnect: (element: HTMLElement) => void;

  constructor() {
    const {tw, twOnConnected, twOnDisconnect} = getTwind();
    this.twind = tw;
    this.twOnConnected = twOnConnected;
    this.twOnDisconnect = twOnDisconnect;
  }

  public connectedCallback() {
    adoptStyles(this.host.shadowRoot!, css);
    this.twOnConnected(this.host);
    this.start = this.range?.start;
    this.end = this.range?.end;
  }

  disconnectedCallback() {
    this.twOnDisconnect(this.host);
  }

  private apply() {
    if (!this.startRef.validity.valid || !this.endRef.validity.valid) {
      return;
    }

    this.applyInput.emit({
      start: this.start,
      end: this.end,
    });
  }

  private get absoluteMinimum(): number {
    const {field} = this.facet.state;
    const isPriceField = ['ec_price', 'ec_promo_price'].includes(field);
    return isPriceField ? 0 : Number.MIN_SAFE_INTEGER;
  }

  private get minimumInputValue(): number {
    return isUndefined(this.start) ? this.absoluteMinimum : this.start;
  }

  private get maximumInputValue() {
    return isUndefined(this.end) ? Number.MAX_SAFE_INTEGER : this.end;
  }

  render() {
    const {facetId} = this.facet.state;
    const label = this.bindings.i18n.t(this.label);
    const minText = this.bindings.i18n.t('min');
    const maxText = this.bindings.i18n.t('max');
    const minAria = this.bindings.i18n.t('number-input-minimum', {label});
    const maxAria = this.bindings.i18n.t('number-input-maximum', {label});
    const apply = this.bindings.i18n.t('apply');
    const applyAria = this.bindings.i18n.t('number-input-apply', {label});

    const inputClasses =
      'p-2.5 input-primary placeholder-neutral-dark min-w-0 mr-1';
    const labelClasses = 'text-neutral-dark text-sm';
    const step = 'any';

    return (
      <form
        class={this.twind('mt-4 gap-y-0.5 px-2')}
        part="input-form"
        onSubmit={(e) => {
          e.preventDefault();
          this.apply();
          return false;
        }}
      >
        <label
          part="label-start"
          class={this.twind(labelClasses)}
          htmlFor={`${facetId}_start`}
        >
          {minText}
        </label>
        <input
          part="input-start"
          id={`${facetId}_start`}
          type="number"
          step={step}
          ref={(ref) => (this.startRef = ref!)}
          class={this.twind(inputClasses)}
          aria-label={minAria}
          required
          min={this.absoluteMinimum}
          max={this.maximumInputValue}
          value={this.range?.start}
          onInput={(e) =>
            (this.start = (e.target as HTMLInputElement).valueAsNumber)
          }
        />
        <label
          part="label-end"
          class={this.twind(labelClasses)}
          htmlFor={`${facetId}_end`}
        >
          {maxText}
        </label>
        <input
          part="input-end"
          id={`${facetId}_end`}
          type="number"
          step={step}
          ref={(ref) => (this.endRef = ref!)}
          class={this.twind(inputClasses)}
          aria-label={maxAria}
          required
          min={this.minimumInputValue}
          max={Number.MAX_SAFE_INTEGER}
          value={this.range?.end}
          onInput={(e) =>
            (this.end = (e.target as HTMLInputElement).valueAsNumber)
          }
        />
        <Button
          style="outline-primary"
          type="submit"
          part="input-apply-button"
          class={this.twind('flex-none truncate p-2.5')}
          ariaLabel={applyAria}
          text={apply}
        ></Button>
      </form>
    );
  }
}
