// generic version of Workaround: https://github.com/prisma/prisma/issues/12504#issuecomment-1147356141

export type TObj<T extends string> = { [K in T]: K };

export const create = <T extends string>(): TObj<T> => {
  const obj = {} as TObj<T>;
  for (const key of Object.keys(obj) as T[]) {
    obj[key] = key;
  }
  return obj;
};
