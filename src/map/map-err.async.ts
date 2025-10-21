import { matchAsync } from '@/match';
import { type Res, err } from '@/res';

export async function mapErrAsync<IT>(
  self: Res<IT>,
  map: (error: Error) => Promise<Error>,
): Promise<Res<IT>> {
  return await matchAsync(self, {
    ok: () => self,
    err: async (_err) => err(await map(_err)),
  });
}
