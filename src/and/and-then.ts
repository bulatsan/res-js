import { match } from '@/match';
import { type Res, err } from '@/res';

export function andThen<IT, OT>(
  self: Res<IT>,
  then: (ok: IT) => Res<OT>,
): Res<OT> {
  return match(self, {
    ok: then,
    err,
  });
}
