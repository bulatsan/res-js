import { matchAsync } from '@/match';
import { type Res, err, ok } from '@/res';

export async function mapAsync<IT, OT>(
  self: Res<IT>,
  fn: (data: IT) => Promise<OT>,
): Promise<Res<OT>> {
  return await matchAsync<IT, Res<OT>>(
    self,
    async (_ok) => ok(await fn(_ok)),
    async (_err) => err(_err),
  );
}
