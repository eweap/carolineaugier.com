export function queryKeyFactory(entityName: string) {
  const queryKey = {
    all: [entityName],
    list: () => [...queryKey.all, "LIST"],
    details: (id: string) => [...queryKey.all, id],
  };

  return queryKey;
}
