import { match } from './match';
import { type Pipe, pipe } from './pipe';
import { type Res, err } from './res';

export function mapErr<IT>(
  self: Res<IT>,
  fn: (error: Error) => Error,
): Pipe<IT> {
  return pipe(
    match(
      self,
      (_ok) => self,
      (_err) => err(fn(_err)),
    ),
  );
}
