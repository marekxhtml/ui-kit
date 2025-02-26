import {vi} from 'vitest';

export const mockThingy = vi.fn((_store, callback) => {
  callback(true);
});
