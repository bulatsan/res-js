import { match } from '@/match';
import { type Res, err } from '@/res';

export function mapErr<IT>(
  self: Res<IT>,
  map: (error: Error) => Error,
): Res<IT> {
  return match(self, {
    ok: () => self,
    err: (_err) => err(map(_err)),
  });
}
