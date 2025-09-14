export type Res<T> = { ok: T; err?: never } | { ok?: never; err: Error };

export type ResAsync<T> = Promise<Res<T>>;

export function ok<T>(value: T): Res<T> {
  return { ok: value };
}

export function err(error: Error): Res<never> {
  return { err: error };
}
