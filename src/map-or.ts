import { match } from './match';
import { type Pipe, pipe } from './pipe';
import { type Res, ok } from './res';

export function mapOr<IT, OT>(
  self: Res<IT>,
  defaultValue: OT,
  fn: (ok: IT) => OT,
): Pipe<OT> {
  return pipe(
    match(
      self,
      (_ok) => ok(fn(_ok)),
      (_err) => ok(defaultValue),
    ),
  );
}
