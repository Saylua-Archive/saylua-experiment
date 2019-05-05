// Pluralize a noun based on a count.
export const _n = (singular, pluralArg) => {
  const plural = pluralArg || `${singular}s`;
  return count => (count === 1 ? singular : plural);
};

// Pluralize a verb based on a subject object.
export const _v = (plural, singularArg) => {
  const singular = singularArg || `${plural}s`;
  return subject => (subject.grammar.isPlural ? plural : singular);
};
