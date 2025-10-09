import { Res, ok } from './res';

type ResDataList<ResList extends readonly Res<unknown>[]> = {
  [K in keyof ResList]: ResList[K] extends Res<infer D> ? D : never;
};

export function combine<ResList extends readonly Res<unknown>[]>(
  ...results: ResList
): Res<ResDataList<ResList>> {
  const combined = [];

  for (const r of results) {
    if (r.err) {
      return r;
    }

    combined.push(r.ok);
  }

  return ok(combined as ResDataList<ResList>);
}
