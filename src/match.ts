import { type Res } from './res';

export function match<IT, OT>(
  res: Res<IT>,
  onOk: (ok: IT) => OT,
  onErr: (err: Error) => OT,
): OT {
  return res.err ? onErr(res.err) : onOk(res.ok);
}
