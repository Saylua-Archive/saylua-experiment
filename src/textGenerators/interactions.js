import { randomChoice } from '../helpers/utils';
import { SPRITE_ENCYCLOPEDIA } from '../gameData/spriteEncyclopedia';

export const token = () => randomChoice(['twig', 'flower', 'glowing fruit',
  'rock', 'leaf', 'bit of straw']);

export const coat = sprite => SPRITE_ENCYCLOPEDIA[sprite.species].vocab.coat;
export const chirp = sprite => SPRITE_ENCYCLOPEDIA[sprite.species].vocab.chirp;
export const purr = sprite => SPRITE_ENCYCLOPEDIA[sprite.species].vocab.purr;
export const growl = sprite => SPRITE_ENCYCLOPEDIA[sprite.species].vocab.growl;
export const nose = sprite => SPRITE_ENCYCLOPEDIA[sprite.species].vocab.nose;

export const chirling = sprite => sprite.species;
export const a_chirling = sprite => `
  ${SPRITE_ENCYCLOPEDIA[sprite.species].grammar.article} ${sprite.species}`;
export const chirlings = sprite => SPRITE_ENCYCLOPEDIA[sprite.species].grammar.plural;
export const Kimberly = sprite => sprite.name;
