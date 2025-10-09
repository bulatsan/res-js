import { match } from '@/match';
import { type Res, ok } from '@/res';

export function mapOr<IT, OT>(
  self: Res<IT>,
  defaultValue: OT,
  fn: (ok: IT) => OT,
): Res<OT> {
  return match(
    self,
    (_ok) => ok(fn(_ok)),
    (_err) => ok(defaultValue),
  );
}
