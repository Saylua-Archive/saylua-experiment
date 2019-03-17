import { randomChoice } from '../helpers/utils';
import { SPRITE_ENCYCLOPEDIA } from '../textData/spriteEncyclopedia';

export const token = (sprite) => randomChoice([`twig`, `flower`, `glowing fruit`,
  `rock`, `leaf`, `bit of straw`]);

export const coat = (sprite) => SPRITE_ENCYCLOPEDIA[sprite.species].coat;
export const call = (sprite) => SPRITE_ENCYCLOPEDIA[sprite.species].call;
export const purr = (sprite) => SPRITE_ENCYCLOPEDIA[sprite.species].purr;
export const growl = (sprite) => SPRITE_ENCYCLOPEDIA[sprite.species].growl;
export const nose = (sprite) => SPRITE_ENCYCLOPEDIA[sprite.species].nose;
