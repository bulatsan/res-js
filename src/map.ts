import { err, ok, ResAsync, type Res } from './res';

export function mapOk<IT, OT>(
  res: Res<IT>,
  handler: (data: IT) => OT,
): Res<OT> {
  if (res.err) {
    return err(res.err);
  }

  return ok(handler(res.ok));
}

export async function mapOkAsync<IT, OT>(
  res: ResAsync<IT>,
  handler: (data: IT) => OT,
): Promise<Res<OT>> {
  return mapOk(await res, handler);
}

export function mapErr<IT>(
  res: Res<IT>,
  handler: (error: Error) => Error,
): Res<IT> {
  if (res.err) {
    return err(handler(res.err));
  }

  return res;
}

export async function mapErrAsync<IT>(
  res: ResAsync<IT>,
  handler: (error: Error) => Error,
): Promise<Res<IT>> {
  return mapErr(await res, handler);
}

export function map<IT, OT>(
  res: Res<IT>,
  okHandler: (data: IT) => OT,
  errHandler: (error: Error) => Error,
): Res<OT> {
  if (res.err) {
    return err(errHandler(res.err));
  }

  return ok(okHandler(res.ok));
}

export async function mapAsync<IT, OT>(
  res: ResAsync<IT>,
  okHandler: (data: IT) => OT,
  errHandler: (error: Error) => Error,
): ResAsync<OT> {
  return map(await res, okHandler, errHandler);
}
