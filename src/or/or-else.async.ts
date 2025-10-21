import { matchAsync } from '@/match';
import { type Res } from '@/res';

export async function orElseAsync<T>(
  self: Res<T>,
  map: (err: Error) => Promise<Res<T>>,
): Promise<Res<T>> {
  return await matchAsync(self, {
    ok: () => self,
    err: map,
  });
}
