import { match } from './match';
import { type Res } from './res';

export function unwrap<T>(res: Res<T>): T {
  return match(
    res,
    (_ok) => _ok,
    (_err) => {
      throw _err;
    },
  );
}
