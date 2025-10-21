import { matchAsync } from '@/match';
import { type Res, err } from '@/res';

export async function andAsync<IT, OT>(
  self: Res<IT>,
  other: Promise<Res<OT>>,
): Promise<Res<OT>> {
  return await matchAsync(self, {
    ok: () => other,
    err,
  });
}
