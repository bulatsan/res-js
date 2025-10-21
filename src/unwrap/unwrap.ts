import { match } from '@/match';
import { type Res } from '@/res';

export function unwrap<T>(self: Res<T>): T {
  return match(self, {
    ok: (_ok) => _ok,
    err: (_err) => {
      throw _err;
    },
  });
}
