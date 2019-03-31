/* eslint-disable import/prefer-default-export */
import { PET_TEMPLATES, WATER_TEMPLATES, GROOM_TEMPLATES, TREAT_TEMPLATES,
  SING_TEMPLATES, APPROACH_TEMPLATES, WAIT_TEMPLATES } from '../templates/templates';

export const TRUST_LEVELS = {
  neutral: 0,
  curious: 2,
  friendly: 5,
  bonded: 8,
};

function nameOrWild(sprite) {
  if (sprite.trust > TRUST_LEVELS.friendly) {
    return sprite.name;
  }
  return `the ${sprite.species}`;
}

export const INTERACTION_TYPES = {
  pet: {
    maxDistance: 0,
    maxPerDay: 3,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Pet ${nameOrWild(sprite)}`,
    templates: PET_TEMPLATES,
  },
  water: {
    maxDistance: 0,
    maxPerDay: 1,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Give ${nameOrWild(sprite)} water`,
    templates: WATER_TEMPLATES,
  },
  groom: {
    maxDistance: 0,
    maxPerDay: 1,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Groom ${nameOrWild(sprite)}`,
    templates: GROOM_TEMPLATES,
  },
  treat: {
    maxDistance: 0,
    maxPerDay: 0,
    trustIncrease: 2,
    usesTreat: true,
    buttonTextTemplate: sprite => `Give ${nameOrWild(sprite)} a treat`,
    templates: TREAT_TEMPLATES,
  },
  sing: {
    maxDistance: 0,
    maxPerDay: 3,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Sing to ${nameOrWild(sprite)}`,
    templates: SING_TEMPLATES,
  },
  approach: {
    mindistance: 0,
    maxPerDay: 0,
    trustIncrease: -1,
    distanceDecrease: 1,
    buttonTextTemplate: sprite => `Approach ${nameOrWild(sprite)}`,
    templates: APPROACH_TEMPLATES,
  },
  wait: {
    mindistance: 0,
    maxPerDay: 0,
    trustIncrease: 1,
    buttonTextTemplate: () => `Wait...`,
    templates: WAIT_TEMPLATES,
  },
};
