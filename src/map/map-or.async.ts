import { matchAsync } from '@/match';
import { type Res, ok } from '@/res';

export async function mapOrAsync<IT, OT>(
  self: Res<IT>,
  defaultValue: OT,
  map: (ok: IT) => Promise<OT>,
): Promise<Res<OT>> {
  return await matchAsync(self, {
    ok: async (_ok) => ok(await map(_ok)),
    err: async () => ok(defaultValue),
  });
}
