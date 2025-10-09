import { matchAsync } from '@/match';
import { type Res } from '@/res';

export async function orElseAsync<T>(
  self: Res<T>,
  fn: (err: Error) => Promise<Res<T>>,
): Promise<Res<T>> {
  return await matchAsync(
    self,
    async (_ok) => self,
    async (_err) => await fn(_err),
  );
}
