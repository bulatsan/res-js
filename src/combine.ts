import { Res, ok } from './res';

export function combine<T>(results: Res<T>[]): Res<T[]> {
  const combined = [] as T[];

  for (const r of results) {
    if (r.err) {
      return r;
    }

    combined.push(r.ok);
  }

  return ok(combined);
}
