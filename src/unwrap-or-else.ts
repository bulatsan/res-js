import { match } from './match';
import { type Res } from './res';

export function unwrapOrElse<T>(self: Res<T>, f: (err: Error) => T): T {
  return match(
    self,
    (_ok) => _ok,
    (_err) => f(_err),
  );
}
