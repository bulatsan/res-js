import { match } from './match';
import { type Pipe, pipe } from './pipe';
import { type Res } from './res';

export function or<T>(self: Res<T>, res: Res<T>): Pipe<T> {
  return pipe(
    match(
      self,
      (_ok) => self,
      (_err) => res,
    ),
  );
}
