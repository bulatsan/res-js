import { type Pipe, PipeAsync, pipe } from './pipe';
import { err, ok } from './res';

export function wrap<T>(fn: () => T): Pipe<T> {
  try {
    return pipe(ok(fn()));
  } catch (error) {
    if (error instanceof Error) {
      return pipe(err(error));
    }

    return pipe(err(new Error(String(error))));
  }
}

export async function wrapAsync<T>(fn: () => Promise<T>): PipeAsync<T> {
  try {
    return pipe(ok(await fn()));
  } catch (error) {
    if (error instanceof Error) {
      return pipe(err(error));
    }

    return pipe(err(new Error(String(error))));
  }
}
