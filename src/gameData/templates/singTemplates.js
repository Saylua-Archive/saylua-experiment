import { They_re } from '../../helpers/textHelpers/pronouns';
import { chirp, chirling, a_chirling, Kimberly, chirping,
  purrs, chirps, growls } from '../../helpers/textHelpers/interactions';
import { spriteText } from '../../helpers/textHelpers/helpers';

const oldMacDonaldSong = sprite => spriteText(sprite)`
  Old MacDonald had a den${'  '}
  E-I-E-I-O${'  '}
  And in his den he had ${a_chirling}${'  '}
  E-I-E-I-O${'  '}
  With a ${chirp} ${chirp} here${'  '}
  And a ${chirp} ${chirp} there${'  '}
  Here a ${chirp}, there a ${chirp}${'  '}
  Everywhere a ${chirp} ${chirp}
`;

export const SING_ACTIONS = [
  sprite => spriteText(sprite)`You start singing "Old MacDonald had a den" to the ${chirling}.

    ${oldMacDonaldSong}`,
];

export const SING_REACTIONS = {
  wild: [
    sprite => ({
      text: spriteText(sprite)`The ${chirling} ${growls} at you.`,
      kaomoji: 'worried',
    }),
    sprite => ({
      text: spriteText(sprite)`The ${chirling} runs off, but you can see them
          listening from the bushes.`,
      kaomoji: 'anxious',
    }),
  ],
  bonded: [
    sprite => ({
      text: spriteText(sprite)`The ${chirling} gives you a quizzical look.`,
      kaomoji: 'bored',
    }),
    sprite => ({
      text: spriteText(sprite)`The ${chirling} ${chirps} happily.`,
      kaomoji: 'sing',
    }),
  ],
  curious: [
    sprite => ({
      text: spriteText(sprite)`You sing a little song for ${Kimberly}.
          ${They_re} ${chirping} along.`,
      kaomoji: 'sing',
    }),
    sprite => ({
      text: spriteText(sprite)`${Kimberly} ${purrs} happily as you sing.`,
      kaomoji: 'sing',
    }),
  ],
  friendly: [
    sprite => ({
      text: spriteText(sprite)`${Kimberly} ${purrs} along as you sing.`,
      kaomoji: 'sing',
    }),
    sprite => ({
      text: spriteText(sprite)`${Kimberly} ${chirps} to the beat.`,
      kaomoji: 'sing',
    }),
    sprite => ({
      text: spriteText(sprite)`${Kimberly} cuddles up as you sing a
          lullaby.`,
      kaomoji: 'lullaby',
    }),
  ],
};
