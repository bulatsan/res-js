import { match } from './match';
import { type Pipe, pipe } from './pipe';
import { type Res, err } from './res';

export function andThen<IT, OT>(
  self: Res<IT>,
  fn: (ok: IT) => Res<OT>,
): Pipe<OT> {
  return pipe(
    match(
      self,
      (_ok) => fn(_ok),
      (_err) => err(_err),
    ),
  );
}
