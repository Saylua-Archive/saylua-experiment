/* eslint-disable import/prefer-default-export */
import { PET_TEMPLATES, WATER_TEMPLATES, GROOM_TEMPLATES, TREAT_TEMPLATES,
  SING_TEMPLATES, APPROACH_TEMPLATES, WAIT_TEMPLATES, FLEE_TEMPLATES } from '../templates/templates';

export const TRUST_LEVELS = {
  tolerant: -6,
  neutral: 0,
  curious: 1,
  friendly: 2,
  bonded: 3,
};

function nameOrWild(sprite) {
  if (sprite.trust > TRUST_LEVELS.friendly) {
    return sprite.name;
  }
  return `the ${sprite.species}`;
}

export const INTERACTION_TYPES = {
  pet: {
    minTrust: 0,
    maxDistance: 0,
    maxPerDay: 3,
    trustIncrease: () => 1,
    buttonTextTemplate: sprite => `Pet ${nameOrWild(sprite)}`,
    templates: PET_TEMPLATES,
  },
  water: {
    maxDistance: 0,
    maxPerDay: 1,
    trustIncrease: () => 1,
    buttonTextTemplate: sprite => `Give ${nameOrWild(sprite)} water`,
    templates: WATER_TEMPLATES,
  },
  groom: {
    minTrust: 3,
    maxDistance: 0,
    maxPerDay: 1,
    trustIncrease: () => 1,
    buttonTextTemplate: sprite => `Groom ${nameOrWild(sprite)}`,
    templates: GROOM_TEMPLATES,
  },
  treat: {
    maxDistance: 0,
    maxPerDay: 0,
    trustIncrease: () => 2,
    usesTreat: true,
    buttonTextTemplate: sprite => `Give ${nameOrWild(sprite)} a treat`,
    templates: TREAT_TEMPLATES,
  },
  sing: {
    minTrust: 2,
    maxDistance: 0,
    maxPerDay: 3,
    trustIncrease: () => 1,
    buttonTextTemplate: sprite => `Sing to ${nameOrWild(sprite)}`,
    templates: SING_TEMPLATES,
  },
  approach: {
    minDistance: 0,
    maxPerDay: 0,
    trustIncrease: () => (Math.random() > 0.5 ? -1 : -2),
    distanceDecrease: () => 1,
    buttonTextTemplate: sprite => `Approach ${nameOrWild(sprite)}`,
    templates: APPROACH_TEMPLATES,
  },
  wait: {
    minDistance: 0,
    maxPerDay: 0,
    trustIncrease: () => 1,
    distanceDecrease: () => (Math.random() > 0.3 ? 0 : -1),
    buttonTextTemplate: () => `Wait...`,
    templates: WAIT_TEMPLATES,
  },
  flee: {
    unavailable: true,
    maxPerDay: -1,
    templates: FLEE_TEMPLATES,
    newSprite: true,
    buttonTextTemplate: () => `Goodbye...`,
  },
};
