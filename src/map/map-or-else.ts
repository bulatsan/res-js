import { match } from '@/match';
import { type Res, ok } from '@/res';

export function mapOrElse<IT, OT>(
  self: Res<IT>,
  defaultFn: (err: Error) => OT,
  map: (ok: IT) => OT,
): Res<OT> {
  return match(self, {
    ok: (_ok) => ok(map(_ok)),
    err: (_err) => ok(defaultFn(_err)),
  });
}
