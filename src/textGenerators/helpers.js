// Pluralize a noun or verb based on a count.
export const p = (singular, pluralArg) => {
  const plural = pluralArg || `${singular}s`;
  return (count) => count === 1 ? singular : plural;
}
