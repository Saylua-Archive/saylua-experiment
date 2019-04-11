/* eslint-disable import/prefer-default-export */
import { PET_TEMPLATES, WATER_TEMPLATES, GROOM_TEMPLATES, TREAT_TEMPLATES,
  SING_TEMPLATES, APPROACH_TEMPLATES, WAIT_TEMPLATES } from '../templates/templates';

import store from '../store';

import { randomChoice } from '../helpers/utils';

import { interactWithSprite } from '../reducers/spriteReducer';
import { setEventText } from '../reducers/gameReducer';

export const TRUST_LEVELS = {
  tolerant: -6,
  neutral: 0,
  curious: 1,
  friendly: 2,
  bonded: 3,
};

function sD(action) {
  store.dispatch(action);
}

function nameOrWild(sprite) {
  if (sprite.trust > TRUST_LEVELS.friendly) {
    return sprite.name;
  }
  return `the ${sprite.species}`;
}

// TODO: Rethink how we choose texts based on situations.
function chooseText(sprite, templates, trust, distance) {
  if (distance > 0 && trust + distance < 0) {
    return randomChoice(templates.anxious)(sprite);
  }
  if (distance > 0 && trust + distance >= 0) {
    return randomChoice(templates.comfortable)(sprite);
  }
  if (trust < TRUST_LEVELS.curious) {
    return randomChoice(templates.wild)(sprite);
  }
  if (trust < TRUST_LEVELS.friendly) {
    return randomChoice(templates.curious)(sprite);
  }
  if (trust < TRUST_LEVELS.bonded) {
    return randomChoice(templates.friendly)(sprite);
  }
  return randomChoice(templates.bonded)(sprite);
}

function generateEventText(sprite, templates) {
  const { trust, distance } = sprite;

  if (templates) {
    return chooseText(sprite, templates, trust, distance);
  }
  return '';
}

export const INTERACTION_TYPES = {
  pet: sprite => ({
    isAvailable: sprite.trust > 0 && sprite.distance <= 0,
    buttonText: `Pet ${nameOrWild(sprite)}`,
    notNowTemplate: `${nameOrWild(sprite)} isn't in the mood for petting.`,
    interact: () => {
      sD(setEventText(generateEventText(sprite, PET_TEMPLATES)));
      sD(interactWithSprite(sprite.name, { trust: 1 }));
    },
  }),
  water: sprite => ({
    isAvailable: sprite.distance <= 0,
    buttonText: `Give ${nameOrWild(sprite)} water`,
    notNowTemplate: `${nameOrWild(sprite)} isn't thirsty.`,
    interact: () => {
      sD(setEventText(generateEventText(sprite, WATER_TEMPLATES)));
      sD(interactWithSprite(sprite.name, { trust: 1 }));
    },
  }),
  groom: sprite => ({
    isAvailable: sprite.distance <= 0 && sprite.trust >= 3,
    buttonText: `Groom ${nameOrWild(sprite)}`,
    notNowTemplate: `${nameOrWild(sprite)} is already groomed.`,
    interact: () => {
      sD(setEventText(generateEventText(sprite, GROOM_TEMPLATES)));
      sD(interactWithSprite(sprite.name, { trust: 1 }));
    },
  }),
  treat: sprite => ({
    isAvailable: sprite.distance <= 0,
    buttonText: `Give ${nameOrWild(sprite)} a treat`,
    notNowTemplate: 'You\'re out of treats.',
    interact: () => {
      sD(setEventText(generateEventText(sprite, TREAT_TEMPLATES)));
      sD(interactWithSprite(sprite.name, { trust: 2 }));
    },
  }),
  sing: sprite => ({
    isAvailable: sprite.distance <= 0 && sprite.trust >= 2,
    buttonText: `Sing to ${nameOrWild(sprite)}`,
    notNowTemplate: `${nameOrWild(sprite)} is tired of singing.`,
    interact: () => {
      sD(setEventText(generateEventText(sprite, SING_TEMPLATES)));
      sD(interactWithSprite(sprite.name, { trust: 1 }));
    },
  }),
  approach: sprite => ({
    isAvailable: sprite.distance > 0,
    buttonText: `Approach ${nameOrWild(sprite)}`,
    interact: () => {
      sD(setEventText(generateEventText(sprite, APPROACH_TEMPLATES)));
      sD(interactWithSprite(sprite.name, { distance: -1, trust: Math.random() > 0.5 ? 0 : -1 }));
    },
  }),
  wait: sprite => ({
    isAvailable: sprite.distance > 0,
    buttonText: `Wait...`,
    interact: () => {
      sD(setEventText(generateEventText(sprite, WAIT_TEMPLATES)));
      sD(interactWithSprite(sprite.name, { distance: Math.random() > 0.2 ? 0 : 1, trust: 1 }));
    },
  }),
};
