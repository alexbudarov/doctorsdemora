// prefix for source that contains private file data
export const privateFileSourcePrefix: string = "__fileSource__";

export function filterFilesFromData<T extends Record<string, unknown>>(data: T): Partial<T> {
  const dataWithoutFiles: Partial<T> = Object.keys(data).reduce(
    (acc: Partial<T>, key: string) =>
      key.startsWith(privateFileSourcePrefix) ? acc : { [key]: data[key], ...acc },
    {}
  );
  return dataWithoutFiles;
}
