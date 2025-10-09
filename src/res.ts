export type Ok<T> = { ok: T; err?: never };
export type Err = { ok?: never; err: Error };

export type Res<T> = Ok<T> | Err;
export type ResAsync<T> = Promise<Res<T>>;

export function ok<T>(value: T): Ok<T> {
  return { ok: value };
}

export function err(error: Error): Err {
  return { err: error };
}
