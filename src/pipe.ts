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

export function pipe<T>(result: Res<T>): Pipe<T> {
  return {
    ...result,
    map: (fn) => pipe(map(result, fn)),
    mapOr: (defaultValue, fn) => pipe(mapOr(result, defaultValue, fn)),
    mapOrElse: (defaultFn, fn) => pipe(mapOrElse(result, defaultFn, fn)),
    mapErr: (fn) => pipe(mapErr(result, fn)),
    and: (fn) => pipe(and(result, fn)),
    andThen: (fn) => pipe(andThen(result, fn)),
    or: (fn) => pipe(or(result, fn)),
    orElse: (fn) => pipe(orElse(result, fn)),
    unwrapOr: (defaultValue) => unwrapOr(result, defaultValue),
    unwrapOrElse: (fn) => unwrapOrElse(result, fn),
    match: (ok, err) => match(result, ok, err),
    res: () => result,
  };
}
