import store from '../../store';
import { addTreat } from '../../reducers/gameReducer';
import { befriendSprite } from '../../reducers/spriteReducer';

import { ALL_PRONOUNS } from '../../models/Language/pronouns';

import Challenges from './Challenges';

const SaydiaStartingEncounters = [
  {
    title: 'A New Friend',
    text: `For the past few weeks, a wild chirling has been following you. After plenty of coaxing and treats, you think she's ready to join you on your adventure.`,
    sprite: {
      species: 'chirling',
      color: 'saylian',
      distance: 1,
    },
    choices: [
      {
        text: `Let's go!`,
        outcome: () => store.dispatch(befriendSprite(
          {
            name: 'Chava',
            species: 'chirling',
            color: 'saylian',
            grammar: ALL_PRONOUNS[2],
          }
        )),
      },
    ],
  },
];

const SaydiaRandomEncounters = [
  {
    title: 'A Cool Breeze',
    text: 'A cool breeze blows past.',
    choices: [
      {
        text: 'Ahhh.',
      },
    ],
  },
  {
    title: 'Warm Sunshine',
    text: `The sun is shining. It's a warm day.`,
    choices: [
      {
        text: 'Lovely.',
      },
    ],
  },
  {
    title: 'Tip the Arko',
    text: 'A wild arko is sitting by the path. It seems to be barking in a sort of... rhythm? You listen for a while, and then it motions toward an empty bowl. Do they want a tip?',
    sprite: {
      species: 'arko',
      color: 'saylian',
      distance: 2,
    },
    choices: [
      {
        text: 'Give them a treat.',
        outcome: () => store.dispatch(addTreat(-1)),
        requirement: gameState => gameState.treatCount >= 1,
        next: {
          title: 'Tipped the Arko',
          text: 'The Arko does a happy little dance for you.',
          sprite: {
            species: 'arko',
            color: 'saylian',
            distance: 2,
          },
          choices: [
            {
              text: 'Cute!',
            },
          ],
        },
      },
      {
        text: 'Pretend not to notice.',
      },
    ],
  },
  {
    title: 'A Test of Strength',
    text: 'A loxi blocks your way. They look like they want to have a test of strength!',
    sprite: {
      species: 'loxi',
      color: 'saylian',
      distance: 2,
    },
    choices: [
      {
        text: `Let's do this!`,
        challenge: Challenges.strength,
        target: 5,
        success: {
          text: `You push and shove... and the loxi backs down!`,
          choices: [
            {
              text: `You've shown your mighty strength.`,
            },
          ],
        },
        failure: {
          text: `You push and shove... but the loxi is too strong! You slip and fall backwards.`,
          choices: [
            {
              text: `You'll have to keep training.`,
            },
          ],
        },
      },
      {
        text: 'Not today.',
      },
    ],
  },
];

export { SaydiaStartingEncounters };
export default SaydiaRandomEncounters;
