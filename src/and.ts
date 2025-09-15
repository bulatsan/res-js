import { match } from './match';
import { type Pipe, pipe } from './pipe';
import { type Res, err } from './res';

export function and<IT, OT>(self: Res<IT>, res: Res<OT>): Pipe<OT> {
  return pipe(
    match(
      self,
      (_ok) => res,
      (_err) => err(_err),
    ),
  );
}
