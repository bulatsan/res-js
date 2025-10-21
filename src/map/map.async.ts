import { matchAsync } from '@/match';
import { type Res, err, ok } from '@/res';

export async function mapAsync<IT, OT>(
  self: Res<IT>,
  map: (data: IT) => Promise<OT>,
): Promise<Res<OT>> {
  return await matchAsync<IT, Res<OT>>(self, {
    ok: async (_ok) => ok(await map(_ok)),
    err,
  });
}
