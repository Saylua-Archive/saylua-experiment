import store from '../../store';
import { addTreat } from '../../reducers/gameReducer';

const WildernessEncounters = [
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
      },
      {
        text: 'Pretend not to notice.',
      },
    ],
  },
];

export default WildernessEncounters;
