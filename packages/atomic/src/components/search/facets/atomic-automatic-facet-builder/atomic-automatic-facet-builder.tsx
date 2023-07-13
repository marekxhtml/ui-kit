import {BooleanValue, NumberValue, Schema} from '@coveo/bueno';
import {
  AutomaticFacetBuilder,
  AutomaticFacetBuilderState,
  SearchStatus,
  buildAutomaticFacetBuilder,
  buildSearchStatus,
} from '@coveo/headless';
import {Component, Prop, State, h} from '@stencil/core';
import {
  BindStateToController,
  InitializableComponent,
  InitializeBindings,
} from '../../../../utils/initialization-utils';
import {Bindings} from '../../atomic-search-interface/atomic-search-interface';

/**
 * @beta - This component is part of the automatic facets feature.
 * Automatic facets are currently in beta testing and should be available soon.
 *
 * The `atomic-automatic-facet-builder` is a component that renders the facets from
 * the automatic facets feature. It dynamically creates multiple atomic-automatic-facet
 * components based on the desiredCount prop. Automatic facets are generated by the index
 * in response to the search query.
 */
@Component({
  tag: 'atomic-automatic-facet-builder',
  shadow: false,
})
export class AtomicAutomaticFacetBuilder implements InitializableComponent {
  @InitializeBindings() public bindings!: Bindings;
  @State() public error!: Error;

  @BindStateToController('automaticFacetBuilder')
  @State()
  private automaticFacetBuilderState!: AutomaticFacetBuilderState;

  public automaticFacetBuilder!: AutomaticFacetBuilder;
  public searchStatus!: SearchStatus;

  /**
   * @beta - This prop is part of the automatic facets feature.
   * Automatic facets are currently in beta testing and should be available soon.
   *
   * The desired count of automatic facets.
   * Must be a positive integer.
   */
  @Prop() public desiredCount!: number;

  /**
   * @beta - This prop is part of the automatic facets feature.
   * Automatic facets are currently in beta testing and should be available soon.
   *
   * Specifies whether the automatic facets are collapsed.
   */
  @Prop() public areCollapsed = true;

  public initialize() {
    this.validateProps();
    this.searchStatus = buildSearchStatus(this.bindings.engine);
    this.automaticFacetBuilder = buildAutomaticFacetBuilder(
      this.bindings.engine,
      {
        desiredCount: this.desiredCount,
      }
    );
  }

  private validateProps() {
    new Schema({
      desiredCount: new NumberValue({min: 1, required: true}),
      areCollapsed: new BooleanValue({default: true, required: false}),
    }).validate({
      desiredCount: this.desiredCount,
      areCollapsed: this.areCollapsed,
    });
  }

  public render() {
    const automaticFacets = this.automaticFacetBuilderState.automaticFacets.map(
      (facet) => {
        return (
          <atomic-automatic-facet
            key={facet.state.field}
            field={facet.state.field}
            facetId={facet.state.field}
            facet={facet}
            searchStatus={this.searchStatus}
            isCollapsed={this.areCollapsed}
          ></atomic-automatic-facet>
        );
      }
    );

    return automaticFacets;
  }
}
