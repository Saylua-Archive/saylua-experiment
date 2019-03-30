/* eslint-disable import/prefer-default-export */
import { PET_TEMPLATES, WATER_TEMPLATES, GROOM_TEMPLATES, TREAT_TEMPLATES, SING_TEMPLATES } from '../templates/templates';

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
    maxPerDay: 3,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Pet ${nameOrWild(sprite)}`,
    templates: PET_TEMPLATES,
  },
  water: {
    maxPerDay: 1,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Give ${nameOrWild(sprite)} water`,
    templates: WATER_TEMPLATES,
  },
  groom: {
    maxPerDay: 1,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Groom ${nameOrWild(sprite)}`,
    templates: GROOM_TEMPLATES,
  },
  treat: {
    maxPerDay: 0,
    trustIncrease: 2,
    usesTreat: true,
    buttonTextTemplate: sprite => `Give ${nameOrWild(sprite)} a treat`,
    templates: TREAT_TEMPLATES,
  },
  sing: {
    maxPerDay: 3,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Sing to ${nameOrWild(sprite)}`,
    templates: SING_TEMPLATES,
  },
};
