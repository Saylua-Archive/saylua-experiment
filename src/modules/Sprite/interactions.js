import { randomChoice } from '../../utils';
import { SPRITE_ENCYCLOPEDIA } from './spriteEncyclopedia';

function spriteVocab(sprite) {
  return SPRITE_ENCYCLOPEDIA[sprite.species].vocab;
}

function spriteGrammar(sprite) {
  return SPRITE_ENCYCLOPEDIA[sprite.species].grammar;
}

export const token = () => randomChoice(['twig', 'flower', 'glowing fruit',
  'rock', 'leaf', 'bit of straw']);

export const coat = sprite => spriteVocab(sprite).coat;

export const chirp = sprite => spriteVocab(sprite).chirp;
export const chirps = sprite => spriteVocab(sprite).chirps || `${chirp(sprite)}s`;
export const chirping = sprite => spriteVocab(sprite).chirping || `${chirp(sprite)}ing`;

export const purr = sprite => spriteVocab(sprite).purr;
export const purrs = sprite => spriteVocab(sprite).purrs || `${purr(sprite)}s`;
export const purring = sprite => spriteVocab(sprite).purring || `${purr(sprite)}ing`;

export const growl = sprite => spriteVocab(sprite).growl;
export const growls = sprite => spriteVocab(sprite).growls || `${growl(sprite)}s`;
export const growling = sprite => spriteVocab(sprite).growling || `${growl(sprite)}ing`;

export const nose = sprite => spriteVocab(sprite).nose;

export const chirling = sprite => sprite.species;
export const a_chirling = sprite => `
  ${spriteGrammar(sprite).article} ${sprite.species}`;
export const chirlings = sprite => spriteGrammar(sprite).plural;
export const Kimberly = sprite => sprite.name;
