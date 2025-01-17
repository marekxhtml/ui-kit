// import {LitElement, html} from 'lit';
// import {property} from 'lit/decorators.js';
// import {watch} from './watch';

// class TestElement extends LitElement {
//   @property({type: String}) myProp: string = '';

//   @watch('myProp')
//   public onMyPropChange(oldValue: string, newValue: string) {
//     this.propChanged = true;
//     this.oldValue = oldValue;
//     this.newValue = newValue;
//   }

//   propChanged = false;
//   oldValue: string | undefined;
//   newValue: string | undefined;

//   protected updated(changedProperties: Map<string | number | symbol, unknown>) {
//     super.updated(changedProperties);
//   }

//   render() {
//     return html`<div>${this.myProp}</div>`;
//   }
// }

// customElements.define('test-element', TestElement);

// describe('@watch decorator', () => {
//   let element: TestElement;

//   beforeEach(() => {
//     element = document.createElement('test-element') as TestElement;
//     document.body.appendChild(element);
//   });

//   afterEach(() => {
//     document.body.removeChild(element);
//   });

//   it('should call the watch method when the property changes', async () => {
//     element.myProp = 'new value';
//     await element.updateComplete;

//     expect(element.propChanged).toBe(true);
//     expect(element.oldValue).toBe('');
//     expect(element.newValue).toBe('new value');
//   });

//   it('should not call the watch method when a different property changes', async () => {
//     element.propChanged = false;
//     element.requestUpdate('anotherProp', 'new value');
//     await element.updateComplete;

//     expect(element.propChanged).toBe(false);
//   });
// });

describe('@watch decorator', () => {
  it.todo('TODO:');
});
