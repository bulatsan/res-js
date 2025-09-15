import { and } from './and';
import { andThen } from './and-then';
import { map } from './map';
import { mapErr } from './map-err';
import { mapOr } from './map-or';
import { mapOrElse } from './map-or-else';
import { match } from './match';
import { or } from './or';
import { orElse } from './or-else';
import { type Res } from './res';
import { unwrapOr } from './unwrap-or';
import { unwrapOrElse } from './unwrap-or-else';

export type PipeAsync<IT> = Promise<Pipe<IT>>;

export type Pipe<IT> = Res<IT> & {
  // transforms Res<IT> into Res<OT>
  map<OT>(fn: (ok: IT) => OT): Pipe<OT>;

  // returns default if Err, otherwise applies function to Ok value
  mapOr<OT>(defaultValue: OT, fn: (ok: IT) => OT): Pipe<OT>;

  // maps to U by applying default(err) if Err, or fn(ok) if Ok
  mapOrElse<OT>(defaultFn: (err: Error) => OT, fn: (ok: IT) => OT): Pipe<OT>;

  // transforms error of Res<IT> and returns another Res<IT>
  mapErr(fn: (err: Error) => Error): Pipe<IT>;

  // acts like a logical AND (ok = true, err = false)
  and<OT>(res: Res<OT>): Pipe<OT>;

  // acts like a and() but evaluates the function only if the result is ok
  andThen<OT>(fn: (ok: IT) => Res<OT>): Pipe<OT>;

  // acts like a logical OR (ok = true, err = false)
  or(res: Res<IT>): Pipe<IT>;

  // acts like a or() but evaluates the function only if the result is err
  orElse(fn: (err: Error) => Res<IT>): Pipe<IT>;

  // returns the value of the result if it is ok, otherwise returns the default value
  unwrapOr(defaultValue: IT): IT;

  // returns the value of the result if it is ok, otherwise evaluates the function
  unwrapOrElse(fn: (err: Error) => IT): IT;

  // matches the result and returns the value of the function that matches the result
  match<OT>(ok: (ok: IT) => OT, err: (err: Error) => OT): OT;

  res(): Res<IT>;
};

export const pipe = {
  from: <IT>(self: Res<IT>) => pipefn(self),

  map: <IT, OT>(self: Res<IT>, fn: (ok: IT) => OT) => pipefn(map(self, fn)),

  mapOr: <IT, OT>(self: Res<IT>, defaultValue: OT, fn: (ok: IT) => OT) =>
    pipefn(mapOr(self, defaultValue, fn)),

  mapOrElse: <IT, OT>(
    self: Res<IT>,
    defaultFn: (err: Error) => OT,
    fn: (ok: IT) => OT,
  ) => pipefn(mapOrElse(self, defaultFn, fn)),

  mapErr: <IT>(self: Res<IT>, fn: (err: Error) => Error) =>
    pipefn(mapErr(self, fn)),

  and: <IT, OT>(self: Res<IT>, res: Res<OT>) => pipefn(and(self, res)),

  andThen: <IT, OT>(self: Res<IT>, fn: (ok: IT) => Res<OT>) =>
    pipefn(andThen(self, fn)),

  or: <IT>(self: Res<IT>, res: Res<IT>) => pipefn(or(self, res)),

  orElse: <IT>(self: Res<IT>, fn: (err: Error) => Res<IT>) =>
    pipefn(orElse(self, fn)),
};

function pipefn<T>(self: Res<T>): Pipe<T> {
  return {
    ...self,
    map: (fn) => pipefn(map(self, fn)),
    mapOr: (defaultValue, fn) => pipefn(mapOr(self, defaultValue, fn)),
    mapOrElse: (defaultFn, fn) => pipefn(mapOrElse(self, defaultFn, fn)),
    mapErr: (fn) => pipefn(mapErr(self, fn)),
    and: (fn) => pipefn(and(self, fn)),
    andThen: (fn) => pipefn(andThen(self, fn)),
    or: (fn) => pipefn(or(self, fn)),
    orElse: (fn) => pipefn(orElse(self, fn)),
    unwrapOr: (defaultValue) => unwrapOr(self, defaultValue),
    unwrapOrElse: (fn) => unwrapOrElse(self, fn),
    match: (ok, err) => match(self, ok, err),
    res: () => self,
  };
}
