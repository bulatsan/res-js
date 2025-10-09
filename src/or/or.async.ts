import { matchAsync } from '@/match';
import { type Res } from '@/res';

export async function orAsync<T>(
  self: Res<T>,
  other: Promise<Res<T>>,
): Promise<Res<T>> {
  return await matchAsync(
    self,
    async (_ok) => self,
    async (_err) => await other,
  );
}
