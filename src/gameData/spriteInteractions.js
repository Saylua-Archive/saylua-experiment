/* eslint-disable import/prefer-default-export */
export const INTERACTION_TYPES = {
  pet: {
    maxPerDay: 3,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Pet ${sprite.name}`,
  },
  water: {
    maxPerDay: 1,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Give ${sprite.name} water`,
  },
  groom: {
    maxPerDay: 1,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Groom ${sprite.name}`,
  },
  treat: {
    maxPerDay: 0,
    trustIncrease: 2,
    usesTreat: true,
    buttonTextTemplate: sprite => `Give ${sprite.name} a treat`,
  },
  sing: {
    maxPerDay: 3,
    trustIncrease: 1,
    buttonTextTemplate: sprite => `Sing to ${sprite.name}`,
  },
};
