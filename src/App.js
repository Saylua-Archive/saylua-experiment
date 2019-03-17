import React, { Component } from 'react';

import soulName from './helpers/name/soulName';
import { capitalizeFirst, randomChoice } from './helpers/utils';
import './App.css';

import SpritePortrait from './sharedComponents/SpritePortrait.js';

import { INTERACTION_TYPES } from './gameData/spriteInteractions.js';
import { SHE_PRONOUNS, HE_PRONOUNS,
  THEY_PRONOUNS } from './textData/pronouns.js';
import { SPRITE_COATS } from './textData/spriteEncyclopedia.js';
import {Their, TheyRe, They, their, they,
  them} from './textGenerators/pronouns.js';
import {token, coat, call, purr, growl, nose} from './textGenerators/interactions.js';

// Event text template ordered linearly based on trust values.
const EVENT_TEXT_TEMPLATES = ([
  (sprite) => `In the distance, you see a ${sprite.species}.`,
  (sprite) => `As you approach, the ${sprite.species} tucks in ${their(sprite)}
    ${coat(sprite)} and scurries away. ${TheyRe(sprite)} hiding under a bush now.`,
  (sprite) => `The ${sprite.species} peeks ${their(sprite)}
    head out of the bush. ${They(sprite)} cocks ${their(sprite)} head
    curiously. But as you reach out your hand, ${they(sprite)}
    quickly retreats back into the bushes.`,
  (sprite) => `You wait patiently outside the bush with your hand gently
    extended. The ${sprite.species} slowly emerges from the leaves,
    ${purr(sprite)}ing softly, gently. You stroke ${their(sprite)}
    silky smooth ${coat(sprite)}, caressing each tuft carefully.`,
  (sprite) => `The ${sprite.species} ${purr(sprite)}s delicately. You're petting
    ${them(sprite)}!`,
  (sprite) => `You look around. You don't notice ${sprite.name} anywhere.
    Did ${they(sprite)} leave? Tuning in intently, you make out a muted
    ${call(sprite)}ing sound, coming from behind a rock. You can see ${sprite.name}'s
    ${nose(sprite)}. ${Their(sprite)} eyes. As you approach, ${they(sprite)} take a few
    hops forward. ${sprite.name} ${purr(sprite)}s as you pet ${them(sprite)}.`,
  (sprite) => `You're sitting in a meadow with ${sprite.name} and start gently
    stroking ${their(sprite)} ${coat(sprite)}. It's a warm day, and ${sprite.name}
    is so very soft.`,
  (sprite) => pickGenerator(YOU_HAVE_BONDED_TEMPLATES, sprite),
]);

const YOU_HAVE_BONDED_TEMPLATES = [
  (sprite) => `As you smile at ${sprite.name}, ${they(sprite)} approach you,
    eager to receive your delicate pets.`,
  (sprite) => `The sun shines brightly on you and ${sprite.name} as you
    stroke ${their(sprite)} ${coat(sprite)}.`,
  (sprite) => `${sprite.name} ${purr(sprite)}s happily as you stroke ${their(sprite)}
    ${coat(sprite)}.`,
  (sprite) => `${sprite.name} seems a bit aloof when you try to pet
    ${them(sprite)}.`,
  (sprite) => `${sprite.name} longingly looks into the distance, seeming
    curious about adventure.`,
  (sprite) => `Gently cleaning ${their(sprite)} ${coat(sprite)}, ${sprite.name} preens a bit.`,
  (sprite) => `You give ${sprite.name} a little pat on the head.`,
  (sprite) => `${sprite.name} brings you a little ${token(sprite)}.`,
];

const pickGenerator = (templateList, sprite) => {
  return randomChoice(templateList)(sprite);
};

const generateTextBasedOnTrustLevel = (templateList, sprite, trustInterval) => {
  trustInterval = trustInterval || 3;
  const templateIndex = Math.max(0,
    Math.min(
      Math.floor(sprite.trust / trustInterval),
      templateList.length - 1
    )
  );

  return templateList[templateIndex](sprite);
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

class App extends Component {
  constructor(props) {
    super(props);

    const species = randomChoice(['arko', 'chirling', 'loxi', 'gam']);
    const color = randomChoice(SPRITE_COATS[species]);
    this.state = {
      dayOffset: 0,
      lastPlayedTimestamp: 0,
      interactionCounts: {},
      sprite: {
        name: capitalizeFirst(soulName()),
        species: species,
        color: color,
        trust: 0,
        pronouns: randomChoice([SHE_PRONOUNS, HE_PRONOUNS,
          THEY_PRONOUNS]),
      },
    };
  }

  currentTime() {
    let date = new Date();
    date.setDate(date.getDate() + this.state.dayOffset);
    return date;
  }

  render() {
    const now = this.currentTime();
    const sprite = this.state.sprite;
    const eventText = generateTextBasedOnTrustLevel(
      EVENT_TEXT_TEMPLATES, sprite, 1);

    const lastPlayed = new Date(this.state.lastPlayedTimestamp);
    const hasBeenADaySincePlaying = now.getDate() !== lastPlayed.getDate() ||
      (now.getTime() - lastPlayed.getTime()) / MS_PER_DAY >= 1;
    const clickSprite = () => interactWithSprite('pet');
    const canPlay = (interactionType) => {
      const interaction = INTERACTION_TYPES[interactionType];
      if (!interaction.maxPerDay) return true;
      const interacted = this.state.interactionCounts[interactionType] || 0;
      return interacted < interaction.maxPerDay || hasBeenADaySincePlaying;
    };
    const interactText = (interactionType) =>
      (INTERACTION_TYPES[interactionType].buttonTextTemplate(sprite));
    const interactWithSprite = (interactionType) => {
      if (!canPlay(interactionType)) return;
      const interaction = INTERACTION_TYPES[interactionType];
      let newInteractionCounts = Object.assign({},
        this.state.interactionCounts,
        {[interactionType]:
          (this.state.interactionCounts[interactionType] || 0) + 1}
      );
      if (hasBeenADaySincePlaying) {
        newInteractionCounts = {[interactionType]: 1};
      }
      this.setState({
        sprite: Object.assign({}, sprite,
          {trust: sprite.trust + interaction.trustIncrease}),
        interactionCounts: newInteractionCounts,
        lastPlayedTimestamp: now.getTime(),
      });
    };

    const advanceDay = () => this.setState({
      dayOffset: this.state.dayOffset + 1,
    });
    return (
      <div className="App">
        <div className="wilderness-background">
          <SpritePortrait
            sprite={sprite}
            petText={interactText('pet')}
            onClick={clickSprite}
          />
        </div>
        <h2>{sprite.name}</h2>
        <p>Trust level: {sprite.trust}</p>
        <p className="event-text">{eventText}</p>
        {
          Object.keys(INTERACTION_TYPES).map((interaction) =>
            <button
              key={interaction}
              onClick={interactWithSprite.bind(this, interaction)}
              disabled={canPlay(interaction) ? undefined : true}
            >
              {interactText(interaction)}
            </button>
          )
        }

        <p>
          The date is {now.toLocaleString()}
        </p>
        <button onClick={advanceDay}>Go to sleep</button>
      </div>
    );
  }
}

export default App;
