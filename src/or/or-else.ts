import { match } from '@/match';
import { type Res } from '@/res';

export function orElse<T>(self: Res<T>, fn: (err: Error) => Res<T>): Res<T> {
  return match(
    self,
    (_ok) => self,
    (_err) => fn(_err),
  );
}
