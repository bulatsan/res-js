import { matchAsync } from '@/match';
import { type Res, err } from '@/res';

export async function andThenAsync<IT, OT>(
  self: Res<IT>,
  then: (ok: IT) => Promise<Res<OT>>,
): Promise<Res<OT>> {
  return await matchAsync(self, {
    ok: then,
    err,
  });
}
