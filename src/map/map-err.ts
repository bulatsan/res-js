import { match } from '@/match';
import { type Res, err } from '@/res';

export function mapErr<IT>(
  self: Res<IT>,
  fn: (error: Error) => Error,
): Res<IT> {
  return match(
    self,
    (_ok) => self,
    (_err) => err(fn(_err)),
  );
}
