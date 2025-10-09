import { type Res, err, ok } from '@/res';

export function wrap<T>(fn: () => T): Res<T> {
  try {
    return ok(fn());
  } catch (error) {
    if (error instanceof Error) {
      return err(error);
    }

    return err(new Error(String(error)));
  }
}
