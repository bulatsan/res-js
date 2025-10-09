import { matchAsync } from '@/match';
import { type Res, err } from '@/res';

export async function andAsync<IT, OT>(
  self: Res<IT>,
  res: Promise<Res<OT>>,
): Promise<Res<OT>> {
  return await matchAsync(
    self,
    async (_ok) => await res,
    async (_err) => err(_err),
  );
}
