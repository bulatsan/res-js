import { match } from './match';
import { type Res } from './res';

export function unwrapOrThrow<T>(self: Res<T>): T {
  return match(
    self,
    (_ok) => _ok,
    (_err) => {
      throw _err;
    },
  );
}
