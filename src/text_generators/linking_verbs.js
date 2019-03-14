import { capitalizeFirst } from '../helpers/utils';


export const were = (actor) => actor.pronouns.usesPluralVerbs ?
  'were' : 'was';
export const Were = (actor) => capitalizeFirst(were());


export const are = (actor) => actor.pronouns.usesPluralVerbs ?
  'are' : 'is';
export const Are = (actor) => capitalizeFirst(are());


// Past perfect tense. ie: They have arrived.
export const have = (actor) => actor.pronouns.usesPluralVerbs ?
  'have' : 'has';
export const Have = (actor) => capitalizeFirst(have());


export const _re = (actor) => actor.pronouns.usesPluralVerbs ?
  `'re` : `'s`;
export const _ve = (actor) => actor.pronouns.usesPluralVerbs ?
  `'ve` : `'s`;
