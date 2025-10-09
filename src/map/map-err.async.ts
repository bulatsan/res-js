import { matchAsync } from '@/match';
import { type Res, err } from '@/res';

export async function mapErrAsync<IT>(
  self: Res<IT>,
  fn: (error: Error) => Promise<Error>,
): Promise<Res<IT>> {
  return await matchAsync(
    self,
    async (_ok) => self,
    async (_err) => err(await fn(_err)),
  );
}
