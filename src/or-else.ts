import { match } from './match';
import { type Pipe, pipe } from './pipe';
import { type Res } from './res';

export function orElse<T>(self: Res<T>, fn: (err: Error) => Res<T>): Pipe<T> {
  return pipe(
    match(
      self,
      (_ok) => self,
      (_err) => fn(_err),
    ),
  );
}
