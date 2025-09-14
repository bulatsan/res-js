export type Res<T, E = Error> = { ok: T; err?: never } | { ok?: never; err: E };
export type ResAsync<T, E = Error> = Promise<Res<T, E>>;

export function ok<T>(value: T): Res<T, never> {
  return { ok: value };
}

export function err<E>(error: E): Res<never, E> {
  return { err: error };
}

export function cover<T>(fn: () => T): Res<T, Error> {
  try {
    return ok(fn());
  } catch (error) {
    if (error instanceof Error) {
      return err(error);
    }

    return err(new Error(String(error)));
  }
}

export async function coverAsync<T>(fn: () => Promise<T>): ResAsync<T, Error> {
  try {
    return ok(await fn());
  } catch (error) {
    if (error instanceof Error) {
      return err(error);
    }

    return err(new Error(String(error)));
  }
}
