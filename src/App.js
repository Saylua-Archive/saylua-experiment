import React, { Component } from 'react';

import soulName from './helpers/name/soulName';
import { capitalizeFirst, randomChoice } from './helpers/utils';
import './App.css';

import SpritePortrait from './SpritePortrait';

import { SHE_PRONOUNS, HE_PRONOUNS,
  THEY_PRONOUNS } from './text_data/pronouns.js';
import {Their, TheyRe, They, their, they,
  them} from './text_generators/pronouns.js';
import {token} from './text_generators/interactions.js';

// Event text template ordered linearly based on trust values.
const EVENT_TEXT_TEMPLATES = ([
  (sprite) => `In the distance, you see a ${sprite.species}.`,
  (sprite) => `As you approach, the ${sprite.species} tucks in ${their(sprite)}
    feathers and scurries away. ${TheyRe(sprite)} hiding under a bush now.`,
  (sprite) => `The ${sprite.species} peeks ${their(sprite)}
    head out of the bush. ${They(sprite)} cocks ${their(sprite)} head
    curiously. But as you reach out your hand, ${they(sprite)}
    quickly retreats back into the bushes.`,
  (sprite) => `You wait patiently outside the bush with your hand gently
    extended. The ${sprite.species} slowly emerges from the leaves,
    chirping softly, gently. You stroke ${their(sprite)}
    silky smooth feathers, caressing each tuft carefully.`,
  (sprite) => `The ${sprite.species} coos delicately. You're petting
    ${them(sprite)}! ${They(sprite)} tells you that ${their(sprite)}
    name is ${sprite.name}.`,
  (sprite) => `You look around. You don't notice ${sprite.name} anywhere.
    Did ${they(sprite)} leave? Tuning in intently, you make out a muted
    chirping sound, coming from behind a rock. You can see ${sprite.name}'s
    beak. ${Their(sprite)} eyes. As you approach, ${they(sprite)} take a few
    hops forward. ${sprite.name} coos as you pet ${them(sprite)}.`,
  (sprite) => `You're sitting in a meadow with ${sprite.name} and start gently
    stroking ${their(sprite)} feathers. It's a warm day, and ${sprite.name}
    is so very soft.`,
  (sprite) => pickGenerator(YOU_HAVE_BONDED_TEMPLATES, sprite),
]);

const YOU_HAVE_BONDED_TEMPLATES = [
  (sprite) => `As you smile at ${sprite.name}, ${they(sprite)} approach you,
    eager to receive your delicate pets.`,
  (sprite) => `The sun shines brightly on you and ${sprite.name} as you
    stroke ${their(sprite)} feathers.`,
  (sprite) => `${sprite.name} chirps happily as you stroke ${their(sprite)}
    feathers.`,
  (sprite) => `${sprite.name} seems a bit aloof when you try to pet
    ${them(sprite)}.`,
  (sprite) => `${sprite.name} longingly looks into the distance, seeming
    curious about adventure.`,
  (sprite) => `Gently cleaning ${their(sprite)} feathers, ${sprite.name} preens a bit.`,
  (sprite) => `You give ${sprite.name} a little pat on the head.`,
  (sprite) => `${sprite.name} brings you a little ${token(sprite)}.`,
];

const PETTING_TEXT_TEMPLATES = [
  (sprite) => `Pet the ${sprite.species}`,
  (sprite) => `Pet ${sprite.name}`,
];

const SPRITE_NAME_TEMPLATES = [
  (sprite) => `A wild ${sprite.species}`,
  (sprite) => `A ${sprite.species}`,
  (sprite) => `${sprite.name} the ${sprite.species}`,
  (sprite) => `${sprite.name}`,
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

const MAX_PLAYS_PER_DAY = 3;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dayOffset: 0,
      lastPlayedTimestamp: 0,
      playCount: 0,
      sprite: {
        name: capitalizeFirst(soulName()),
        species: 'chirling',
        color: 'saylian',
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
    const petText = generateTextBasedOnTrustLevel(
      PETTING_TEXT_TEMPLATES, sprite, 4);
    const nameText = generateTextBasedOnTrustLevel(
      SPRITE_NAME_TEMPLATES, sprite, 2);

    // This trick is based on the fact that now will always be in the
    // future to last played. So if the days are not equal, it's been a day.
    const hasBeenADaySincePlaying = now.getDate()
      !== (new Date(this.state.lastPlayedTimestamp)).getDate();
    const canPlay = this.state.playCount < MAX_PLAYS_PER_DAY ||
      hasBeenADaySincePlaying;
    const clickSprite = () => {
      if (!canPlay) return;
      this.setState({
        sprite: Object.assign({}, sprite, {trust: sprite.trust + 1}),
        playCount: hasBeenADaySincePlaying ? 1 : this.state.playCount + 1,
        lastPlayedTimestamp: now.getTime(),
      });
    }
    const advanceDay = () => this.setState({
      dayOffset: this.state.dayOffset + 1,
    });
    return (
      <div className="App">
        <SpritePortrait
          sprite={this.state.sprite}
          petText={petText}
          onClick={clickSprite}
        />
        <h2>{nameText}</h2>
        <p className="event-text">{eventText}</p>
        {canPlay ?
          <button onClick={clickSprite}>{petText}</button> :
          <p>You'll have to wait until tomorrow to play more!</p>
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
