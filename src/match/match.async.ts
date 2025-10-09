import { type Res } from '@/res';

export async function matchAsync<IT, OT>(
  res: Res<IT>,
  onOk: (ok: IT) => Promise<OT>,
  onErr: (err: Error) => Promise<OT>,
): Promise<OT> {
  return res.err ? await onErr(res.err) : await onOk(res.ok);
}
