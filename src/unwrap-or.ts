import { match } from './match';
import { type Res } from './res';

export function unwrapOr<T>(self: Res<T>, defaultValue: T): T {
  return match(
    self,
    (_ok) => _ok,
    (_err) => defaultValue,
  );
}
