import { err, ok, type ResAsync, type Res } from './res';

export function cover<T>(fn: () => T): Res<T> {
  try {
    return ok(fn());
  } catch (error) {
    if (error instanceof Error) {
      return err(error);
    }

    return err(new Error(String(error)));
  }
}

export async function coverAsync<T>(fn: () => Promise<T>): ResAsync<T> {
  try {
    return ok(await fn());
  } catch (error) {
    if (error instanceof Error) {
      return err(error);
    }

    return err(new Error(String(error)));
  }
}
