import { match } from './match';
import { type Res, err } from './res';

export function and<IT, OT>(self: Res<IT>, res: Res<OT>): Res<OT> {
  return match(
    self,
    (_ok) => res,
    (_err) => err(_err),
  );
}
