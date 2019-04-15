export const THEY_PRONOUNS = {
  pronouns: {
    subject: 'they',
    object: 'them',
    possessive: 'their',
    possessiveStrong: 'theirs',
    reflexive: 'themself',
  },
  isPlural: true,
};

export const HE_PRONOUNS = {
  pronouns: {
    subject: 'he',
    object: 'him',
    possessive: 'his',
    possessiveStrong: 'his',
    reflexive: 'himself',
    usesPluralVerbs: false,
  },
  isPlural: false,
};

export const SHE_PRONOUNS = {
  pronouns: {
    subject: 'she',
    object: 'her',
    possessive: 'her',
    possessiveStrong: 'hers',
    reflexive: 'herself',
    usesPluralVerbs: false,
  },
  isPlural: false,
};

export const ALL_PRONOUNS = [THEY_PRONOUNS, HE_PRONOUNS, SHE_PRONOUNS];
