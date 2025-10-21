import { match } from '@/match';
import { type Res, ok } from '@/res';

export function mapOr<IT, OT>(
  self: Res<IT>,
  defaultValue: OT,
  map: (ok: IT) => OT,
): Res<OT> {
  return match(self, {
    ok: (_ok) => ok(map(_ok)),
    err: () => ok(defaultValue),
  });
}
