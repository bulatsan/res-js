import { match } from './match';
import { type Res, ok } from './res';

export function mapOrElse<IT, OT>(
  self: Res<IT>,
  defaultFn: (err: Error) => OT,
  fn: (ok: IT) => OT,
): Res<OT> {
  return match(
    self,
    (_ok) => ok(fn(_ok)),
    (_err) => ok(defaultFn(_err)),
  );
}
