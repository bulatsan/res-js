import { match } from '@/match';
import { type Res } from '@/res';

export function orElse<T>(self: Res<T>, map: (err: Error) => Res<T>): Res<T> {
  return match(self, {
    ok: () => self,
    err: map,
  });
}
