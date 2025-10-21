import { match } from '@/match';
import { type Res } from '@/res';

export function or<T>(self: Res<T>, other: Res<T>): Res<T> {
  return match(self, {
    ok: () => self,
    err: () => other,
  });
}
