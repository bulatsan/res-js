import { match } from '@/match';
import { type Res, err } from '@/res';

export function and<IT, OT>(self: Res<IT>, other: Res<OT>): Res<OT> {
  return match(self, {
    ok: () => other,
    err,
  });
}
