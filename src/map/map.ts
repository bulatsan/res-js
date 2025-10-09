import { match } from '@/match';
import { type Res, err, ok } from '@/res';

export function map<IT, OT>(self: Res<IT>, fn: (data: IT) => OT): Res<OT> {
  return match<IT, Res<OT>>(
    self,
    (_ok) => ok(fn(_ok)),
    (_err) => err(_err),
  );
}
