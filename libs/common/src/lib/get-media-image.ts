export function getMediaImage<
  T extends {
    __typename?: string;
  },
>(
  reference: T | null | undefined,
): Extract<T, { __typename: "MediaImage" }> | null {
  if (reference?.__typename !== "MediaImage") {
    return null;
  }

  return reference as Extract<T, { __typename: "MediaImage" }>;
}
