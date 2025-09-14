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

export function map<IT, IE, OT, OE>(
  res: Res<IT, IE>,
  handlers: { ok?: (data: IT) => OT; err?: (error: IE) => OE },
): Res<IT, IE> | Res<IT, OE> | Res<OT, IE> | Res<OT, OE> {
  if ('ok' in handlers && 'ok' in res) {
    return ok(handlers.ok(res.ok));
  }

  if ('err' in handlers && 'err' in res) {
    return err(handlers.err(res.err));
  }

  return res;
}

export function mapOk<IT, IE, OT>(
  res: Res<IT, IE>,
  handler: (data: IT) => OT,
): Res<IT, IE> | Res<OT, IE> {
  return map(res, { ok: handler });
}

export function mapErr<IT, IE, OE>(
  res: Res<IT, IE>,
  handler: (error: IE) => OE,
): Res<IT, IE> | Res<IT, OE> {
  return map(res, { err: handler });
}

export async function mapAsync<IT, IE, OT, OE>(
  res: ResAsync<IT, IE>,
  handlers: { ok?: (data: IT) => OT; err?: (error: IE) => OE },
): Promise<Res<IT, IE> | Res<IT, OE> | Res<OT, IE> | Res<OT, OE>> {
  return map(await res, handlers);
}

export async function mapOkAsync<IT, IE, OT>(
  res: ResAsync<IT, IE>,
  handler: (data: IT) => OT,
): Promise<Res<IT, IE> | Res<OT, IE>> {
  return mapAsync(res, { ok: handler });
}

export async function mapErrAsync<IT, IE, OE>(
  res: ResAsync<IT, IE>,
  handler: (error: IE) => OE,
): Promise<Res<IT, IE> | Res<IT, OE>> {
  return mapAsync(res, { err: handler });
}
