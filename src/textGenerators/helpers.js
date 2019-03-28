// Pluralize a noun based on a count.
export const pN = (singular, pluralArg) => {
  const plural = pluralArg || `${singular}s`;
  return count => (count === 1 ? singular : plural);
};

// Pluralize a verb based on a subject object.
export const pV = (plural, singularArg) => {
  const singular = singularArg || `${plural}s`;
  return subject => (subject.grammar.isPlural ? plural : singular);
};

// Tag function to pass down a sprite
export const spriteText = sprite => (strings, ...keys) => {
  let result = '';
  for (let i = 0; i < strings.length; i += 1) {
    result = result.concat(strings[i]);
    if (i < keys.length) {
      result = result.concat(keys[i](sprite));
    }
  }
  return result;
};
