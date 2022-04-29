import {LightningElement, api} from 'lwc';

/**
 * The `QuanticModal` is a container component that displays slotted content in a modal. This component handles the animation logic, exposes methods to open and close the modal, offers the option to open the modal in full screen or just to cover the search interface, and exposes a set of slots to fully customize the modal content.
 *
 * @category Search
 * @example
 * <c-quantic-modal full-screen animation="slideToLeft">
 *   <div slot="header">Modal Header</div>
 *   <div slot="content">Modal Content</div>
 *   <div slot="footer">Modal Footer</div>
 * </c-quantic-modal>
 */
export default class QuanticModal extends LightningElement {
  /**
   * Indicates whether the modal will be opened in full screen.
   * @api
   * @type {boolean}
   * @defaultValue `false`
   */
  @api fullScreen = false;
  /**
   * Indicates the type of animation to use to open the modal.
   * @api
   * @type {'slideToTop'|'slideToLeft'}
   * @defaultValue `slideToTop`
   */
  @api animation = 'slideToTop';

  /** @type {boolean} */
  isVisible = false;

  /**
   * Opens the modal.
   * @returns {void}
   */
  @api openModal() {
    this.isVisible = true;
  }

  /**
   * Closes the modal.
   * @returns {void}
   */
  @api closeModal() {
    this.isVisible = false;
  }

  /**
   * Returns the modal CSS classes.
   * @returns {string}
   */
  get modalCssClass() {
    const displayAreaClass = this.fullScreen ? 'full-screen' : 'part-screen';
    const animationClass =
      this.animation === 'slideToLeft'
        ? 'hidden-modal_slide-to-left'
        : 'hidden-modal_slide-to-top';
    const visibilityClass = this.isVisible
      ? ''
      : `modal_hidden ${animationClass}`;

    return `modal ${displayAreaClass} ${visibilityClass}`;
  }

  /**
   * Returns the tabindex value of the modal.
   * @returns {number}
   */
  get tabindex() {
    return this.isVisible ? 0 : -1;
  }
}
