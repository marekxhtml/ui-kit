import {
  AxeFixture,
  makeAxeBuilder,
  base,
} from '../../../../../playwright-utils/base-fixture';
import {ProductTemplateObject} from './page-object';

interface TestFixture {
  productTemplate: ProductTemplateObject;
}
export const test = base.extend<TestFixture & AxeFixture>({
  makeAxeBuilder,
  productTemplate: async ({page}, use) => {
    await use(new ProductTemplateObject(page));
  },
});
export {expect} from '@playwright/test';
