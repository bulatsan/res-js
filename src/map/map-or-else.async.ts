import { matchAsync } from '@/match';
import { type Res, ok } from '@/res';

export async function mapOrElseAsync<IT, OT>(
  self: Res<IT>,
  defaultFn: (err: Error) => Promise<OT>,
  fn: (ok: IT) => Promise<OT>,
): Promise<Res<OT>> {
  return await matchAsync(
    self,
    async (_ok) => ok(await fn(_ok)),
    async (_err) => ok(await defaultFn(_err)),
  );
}
