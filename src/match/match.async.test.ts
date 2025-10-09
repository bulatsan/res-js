import { describe, expect, it, vi } from 'vitest';

import { err, ok } from '@/res';

import { matchAsync } from './match.async';

describe('matchAsync', () => {
  const OK = ok(1);
  const ERR = err(new Error('error'));

  it('[ok] matchAsync -> onOk(ok)', async () => {
    const onOk = vi.fn(async (_: number) => 'ok');
    const onErr = vi.fn(async (_: Error) => 'err');

    const r = await matchAsync(OK, onOk, onErr);

    expect(r).toEqual('ok');
    expect(onOk).toHaveBeenCalledTimes(1);
    expect(onOk).toHaveBeenCalledWith(1);
    expect(onErr).not.toHaveBeenCalled();
  });

  it('[err] matchAsync -> onErr(err)', async () => {
    const onOk = vi.fn(async (_: number) => 'ok');
    const onErr = vi.fn(async (_: Error) => 'err');

    const r = await matchAsync(ERR, onOk, onErr);

    expect(r).toEqual('err');
    expect(onErr).toHaveBeenCalledTimes(1);
    expect(onErr).toHaveBeenCalledWith(new Error('error'));
    expect(onOk).not.toHaveBeenCalled();
  });
});
