import React, { Component } from 'react';

import soulName from './helpers/name/soulName';
import { capitalizeFirst, randomChoice } from './helpers/utils';
import './App.css';

<<<<<<< HEAD
const they = (state) => state.pronouns.subject;
const They = (state) => capitalizeFirst(they(state));

const theyRe = (state) => (`${state.pronouns.subject}${
  state.pronouns.linkingVerbs.presentContraction}`);
const TheyRe = (state) => capitalizeFirst(theyRe(state));

const them = (state) => state.pronouns.object;
const Them = (state) => capitalizeFirst(them(state));

const their = (state) => state.pronouns.possessive;
const Their = (state) => capitalizeFirst(their(state));

const theirs = (state) => state.pronouns.possessiveStrong;
const Theirs = (state) => capitalizeFirst(theirs(state));

const themself = (state) => state.pronouns.reflexive;
const Themself = (state) => capitalizeFirst(themself(state));

const LINKING_VERB_PROFILES = {
  'singular': {
    past: 'was',
    present: 'is',
    presentContraction: `'s`,
    // Past perfect tense. ie: She has arrived.
    pastPerfect: 'has',
    pastPerfectContraction: `'s`,
  },
  'plural': {
    past: 'were',
    present: 'are',
    presentContraction: `'re`,
    // Past perfect tense. ie: She has arrived.
    pastPerfect: 'have',
    pastPerfectContraction: `'ve`,
  },
};
=======
import { SHE_PRONOUNS, HE_PRONOUNS,
  THEY_PRONOUNS } from './text_data/pronouns.js';
import {Their, TheyRe, They, their, they,
  them} from './text_generators/pronouns.js';
>>>>>>> e681b29bb516ef718b89a520e62444605d7157d0

// Event text template ordered linearly based on trust values.
const EVENT_TEXT_TEMPLATES = [
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
];

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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    const sprite = this.state.sprite;
    const eventText = generateTextBasedOnTrustLevel(
      EVENT_TEXT_TEMPLATES, sprite, 1);
    const petText = generateTextBasedOnTrustLevel(
      PETTING_TEXT_TEMPLATES, sprite, 4);
    const nameText = generateTextBasedOnTrustLevel(
      SPRITE_NAME_TEMPLATES, sprite, 2);
    return (
      <div className="App">
<<<<<<< HEAD
        <img
          src={`img/sprites/${this.state.species}/saylian.png`}
          alt={this.state.species}
          title={this.state.species}
        />
=======
        <img src={`img/sprites/${sprite.species}/${sprite.color}.png`} alt={sprite.species} />
>>>>>>> e681b29bb516ef718b89a520e62444605d7157d0
        <h2>{nameText}</h2>
        <p>{eventText}</p>
        <button
          onClick={() => this.setState({
            sprite: Object.assign({}, sprite, {trust: sprite.trust + 1})
          })}
        >{petText}</button>
      </div>
    );
  }
}

export default App;
