import { match } from '@/match';
import { type Res } from '@/res';

export function unwrapOrElse<T>(self: Res<T>, map: (err: Error) => T): T {
  return match(self, {
    ok: (_ok) => _ok,
    err: map,
  });
}
