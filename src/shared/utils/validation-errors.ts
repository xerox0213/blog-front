export const extractFirstErrors = (errors: Record<string, string[]>) => {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(errors)) {
    result[key] = value[0];
  }

  return result;
};
