import { matchAsync } from '@/match';
import { type Res, err } from '@/res';

export async function andThenAsync<IT, OT>(
  self: Res<IT>,
  fn: (ok: IT) => Promise<Res<OT>>,
): Promise<Res<OT>> {
  return await matchAsync(
    self,
    async (_ok) => await fn(_ok),
    async (_err) => err(_err),
  );
}
