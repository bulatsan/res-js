import { match } from '@/match';
import { type Res, err, ok } from '@/res';

export function map<IT, OT>(self: Res<IT>, map: (data: IT) => OT): Res<OT> {
  return match<IT, Res<OT>>(self, {
    ok: (_ok) => ok(map(_ok)),
    err,
  });
}
