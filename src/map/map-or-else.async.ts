import { matchAsync } from '@/match';
import { type Res, ok } from '@/res';

export async function mapOrElseAsync<IT, OT>(
  self: Res<IT>,
  defaultFn: (err: Error) => Promise<OT>,
  map: (ok: IT) => Promise<OT>,
): Promise<Res<OT>> {
  return await matchAsync(self, {
    ok: async (_ok) => ok(await map(_ok)),
    err: async (_err) => ok(await defaultFn(_err)),
  });
}
