import { describe, expect, it, vi } from 'vitest';

import { err, ok } from '@/res';

import { match } from './match';

describe('match', () => {
  const OK = ok(1);
  const ERR = err(new Error('error'));

  it('[ok] match -> onOk(ok)', () => {
    const onOk = vi.fn((_: number) => 'ok');
    const onErr = vi.fn((_: Error) => 'err');
    const r = match(OK, onOk, onErr);

    expect(r).toEqual('ok');
    expect(onOk).toHaveBeenCalledTimes(1);
    expect(onOk).toHaveBeenCalledWith(1);
    expect(onErr).not.toHaveBeenCalled();
  });

  it('[err] match -> onErr(err)', () => {
    const onOk = vi.fn((_: number) => 'ok');
    const onErr = vi.fn((_: Error) => 'err');
    const r = match(ERR, onOk, onErr);

    expect(r).toEqual('err');
    expect(onErr).toHaveBeenCalledTimes(1);
    expect(onErr).toHaveBeenCalledWith(new Error('error'));
    expect(onOk).not.toHaveBeenCalled();
  });
});
