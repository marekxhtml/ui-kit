import {AxeFixture, makeAxeBuilder} from '@/playwright-utils/base-fixture';
import {test as base} from '@playwright/test';
import {AtomicCommerceBreadboxPageObject as Breadbox} from './page-object';

type MyFixtures = {
  breadbox: Breadbox;
};

export const test = base.extend<MyFixtures & AxeFixture>({
  makeAxeBuilder,
  breadbox: async ({page}, use) => {
    await use(new Breadbox(page));
  },
});
export {expect} from '@playwright/test';
