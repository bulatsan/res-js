import { type Res, err, ok } from '@/res';

export async function wrapAsync<T>(fn: () => Promise<T>): Promise<Res<T>> {
  try {
    return ok(await fn());
  } catch (error) {
    if (error instanceof Error) {
      return err(error);
    }

    return err(new Error(String(error)));
  }
}
