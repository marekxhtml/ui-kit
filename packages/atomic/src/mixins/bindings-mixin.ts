import {consume, createContext} from '@lit/context';
import {LitElement, ReactiveControllerHost, ReactiveElement} from 'lit';
import type {AnyBindings} from '../components/common/interface/bindings';
import {InitializableComponent} from '../decorators/types';
import {watch} from '../decorators/watch';
import {fetchBindings} from '../utils/initialization-lit-stencil-common-utils';

export const bindingsContext = createContext<AnyBindings>('bindings');

export function initializeBindings<
  SpecificBindings extends AnyBindings,
  InstanceType extends ReactiveElement &
    InitializableComponent<SpecificBindings>,
>(instance: InstanceType): Promise<() => void> {
  return new Promise((resolve, reject) => {
    fetchBindings<SpecificBindings>(instance)
      .then((bindings) => {
        instance.bindings = bindings;

        const updateLanguage = () => instance.requestUpdate();
        instance.bindings.i18n.on('languageChanged', updateLanguage);
        const unsubscribeLanguage = () =>
          instance.bindings?.i18n.off('languageChanged', updateLanguage);
        resolve(unsubscribeLanguage);

        instance.initialize?.();
      })
      .catch((error) => {
        instance.error = error;
        reject(error);
      });
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * Mixin that initializes bindings for a Lit component.
 * It ensures that the bindings are initialized using the binding context provided when the host element is instantiated.
 *
 * @param superClass - The LitElement class to extend.
 * @returns A class that extends the superclass with bindings initialization.
 *
 * @example
 * ```ts
 * @customElement('my-element')
 * class MyElement extends InitializeBindingsMixin(LitElement) implements InitializableComponent<AnyBindings> {
 *   public bindings?: AnyBindings;
 * }
 * ```
 */
export const InitializeBindingsMixin = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class BindingControllerMixinClass extends superClass {
    host: ReactiveControllerHost;

    @consume({context: bindingsContext, subscribe: true})
    public bindings!: AnyBindings;

    private bindingsInitialized = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
      this.host = this as ReactiveControllerHost;
    }

    disconnectedCallback(): void {
      super.disconnectedCallback();
      if (this.bindingsInitialized) {
        this.bindings.i18n.off('languageChanged', this.requestUpdate);
      }
    }

    @watch('bindings')
    public bindingsChanged() {
      if (!this.bindingsInitialized && this.bindings) {
        this.bindingsInitialized = true;
        initializeBindings(
          this.host as ReactiveElement & InitializableComponent<AnyBindings>
        );
      }
    }
  }

  return BindingControllerMixinClass as T;
};
