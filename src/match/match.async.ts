import { type Res } from '@/res';

interface MatchAsync<IT, OT> {
  ok: (ok: IT) => Promise<OT> | OT;
  err: (err: Error) => Promise<OT> | OT;
}

export async function matchAsync<IT, OT>(
  res: Res<IT>,
  match: MatchAsync<IT, OT>,
): Promise<OT> {
  return res.err ? await match.err(res.err) : await match.ok(res.ok);
}
