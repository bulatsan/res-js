import { type Res } from '@/res';

interface Match<IT, OT> {
  ok: (ok: IT) => OT;
  err: (err: Error) => OT;
}

export function match<IT, OT>(res: Res<IT>, match: Match<IT, OT>): OT {
  return res.err ? match.err(res.err) : match.ok(res.ok);
}
