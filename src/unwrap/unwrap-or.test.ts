import { describe, expect, it } from 'vitest';

import { err, ok } from '@/res';

import { unwrapOr } from './unwrap-or';

describe('unwrapOr', () => {
  const DEFAULT = 10;

  it('[ok] unwrapOr default -> ok', () => {
    expect(unwrapOr(ok(1), DEFAULT)).toEqual(1);
  });

  it('[err] unwrapOr default -> default', () => {
    expect(unwrapOr(err(new Error('error')), DEFAULT)).toEqual(DEFAULT);
  });
});
