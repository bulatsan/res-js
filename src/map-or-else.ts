import { match } from './match';
import { type Pipe, pipe } from './pipe';
import { type Res, ok } from './res';

export function mapOrElse<IT, OT>(
  self: Res<IT>,
  defaultFn: (err: Error) => OT,
  fn: (ok: IT) => OT,
): Pipe<OT> {
  return pipe(
    match(
      self,
      (_ok) => ok(fn(_ok)),
      (_err) => ok(defaultFn(_err)),
    ),
  );
}
