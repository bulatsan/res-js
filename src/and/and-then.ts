import { match } from '@/match';
import { type Res, err } from '@/res';

export function andThen<IT, OT>(
  self: Res<IT>,
  fn: (ok: IT) => Res<OT>,
): Res<OT> {
  return match(
    self,
    (_ok) => fn(_ok),
    (_err) => err(_err),
  );
}
