/* eslint-disable import/prefer-default-export */
import { PET_TEMPLATES, WATER_TEMPLATES, GROOM_TEMPLATES, TREAT_TEMPLATES, SING_TEMPLATES } from '../templates/templates';

export const INTERACTION_TYPES = {
  pet: {
    maxPerDay: 3,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Pet ${sprite.name}`,
    templates: PET_TEMPLATES,
  },
  water: {
    maxPerDay: 1,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Give ${sprite.name} water`,
    templates: WATER_TEMPLATES,
  },
  groom: {
    maxPerDay: 1,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Groom ${sprite.name}`,
    templates: GROOM_TEMPLATES,
  },
  treat: {
    maxPerDay: 0,
    trustIncrease: 2,
    usesTreat: true,
    buttonTextTemplate: sprite => `Give ${sprite.name} a treat`,
    templates: TREAT_TEMPLATES,
  },
  sing: {
    maxPerDay: 3,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Sing to ${sprite.name}`,
    templates: SING_TEMPLATES,
  },
};
