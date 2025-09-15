import { match } from './match';
import { type Res } from './res';

export function or<T>(self: Res<T>, res: Res<T>): Res<T> {
  return match(
    self,
    (_ok) => self,
    (_err) => res,
  );
}
