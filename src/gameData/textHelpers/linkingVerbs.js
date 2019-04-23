import { capitalizeFirst } from '../../helpers/utils';


export const were = actor => (actor.grammar.isPlural
  ? 'were' : 'was');
export const Were = actor => capitalizeFirst(were(actor));


export const are = actor => (actor.grammar.isPlural
  ? 'are' : 'is');
export const Are = actor => capitalizeFirst(are(actor));


// Past perfect tense. ie: They have arrived.
export const have = actor => (actor.grammar.isPlural
  ? 'have' : 'has');
export const Have = actor => capitalizeFirst(have(actor));


export const _re = actor => (actor.grammar.isPlural
  ? '\'re' : '\'s');
export const _ve = actor => (actor.grammar.isPlural
  ? `'ve` : `'s`);
