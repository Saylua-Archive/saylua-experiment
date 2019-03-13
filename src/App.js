import React, { Component } from 'react';
import logo from './logo.svg';
import soulName from './helpers/name/soulName';
import { capitalizeFirst, randomChoice } from './helpers/utils';
import './App.css';

const they = (state) => state.pronouns.subject;
const They = (state) => capitalizeFirst(they(state));

const theyRe = (state) => `${state.pronouns.subject}${
  state.pronouns.linkingVerbs.presentConstraction}`;
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
    presentConstraction: `'s`,
    // Past perfect tense. ie: She has arrived.
    pastPerfect: 'has',
    pastPerfectConstraction: `'s`,
  },
  'plural': {
    past: 'were',
    present: 'are',
    presentConstraction: `'re`,
    // Past perfect tense. ie: She has arrived.
    pastPerfect: 'have',
    pastPerfectConstraction: `'ve`,
  },
};

// Event text template ordered linearly based on trust values.
const EVENT_TEXT_TEMPLATES = [
  (state) => `In the distance, you see a ${state.species}.`,
  (state) => `As you approach, the ${state.species} tucks in ${their(state)}
    feathers and scurries away. ${TheyRe(state)} hiding under a bush now.`,
  (state) => `The ${state.species} peeks ${their(state)}
    head out of the bush. ${They(state)} cocks ${their(state)} head
    curiously. But as you reach out your hand, ${they(state)}
    quickly retreats back into the bushes.`,
  (state) => `You wait patiently outside the bush with your hand gently
    extended. The ${state.species} slowly emerges from the leaves,
    chirping softly, gently. You stroke ${their(state)}
    silky smooth feathers, caressing each tuft carefully.`,
  (state) => `The ${state.species} coos delicately. You're petting
    ${them(state)}! ${They(state)} tells you that ${their(state)}
    name is ${state.name}.`,
  (state) => `You look around. You don't notice ${state.name} anywhere.
    Did ${they(state)} leave? Tuning in intently, you make out a muted
    chirping sound, coming from behind a rock. You can see ${state.name}'s
    beak. ${Their(state)} eyes. As you approach, ${they(state)} take a few
    hops forward. ${state.name} coos as you pet ${them(state)}.`,
  (state) => `You're sitting in a meadow with ${state.name} and start gently
    stroking ${their(state)} feathers. It's a warm day, and ${state.name}
    is so very soft.`,
  (state) => runRandomTemplate(YOU_HAVE_BONDED_TEMPLATES, state),
];

const YOU_HAVE_BONDED_TEMPLATES = [
  (state) => `As you smile at ${state.name}, ${they(state)} approach you,
    eager to receive your delicate pets.`,
  (state) => `The sun shines brightly on you and ${state.name} as you
    stroke ${their(state)} feathers.`,
  (state) => `${state.name} chirps happily as you stroke ${their(state)}
    feathers.`,
  (state) => `${state.name} seems a bit aloof when you try to pet
    ${them(state)}.`,
  (state) => `${state.name} longingly looks into the distance, seeming
    curious about adventure.`,
];

const PETTING_TEXT_TEMPLATES = [
  (state) => `Pet the ${state.species}`,
  (state) => `Pet ${state.name}`,
];

const SPRITE_NAME_TEMPLATES = [
  (state) => `A wild ${state.species}`,
  (state) => `A ${state.species}`,
  (state) => `${state.name} the ${state.species}`,
  (state) => `${state.name}`,
];

const runRandomTemplate = (templateList, state) => {
  return randomChoice(templateList)(state);
};

const runTemplate = (templateList, state, trustInterval) => {
  trustInterval = trustInterval || 3;
  const templateIndex = Math.max(0,
    Math.min(
      Math.floor(state.trust / trustInterval),
      templateList.length - 1
    )
  );

  return templateList[templateIndex](state);
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: capitalizeFirst(soulName()),
      species: 'chirling',
      pronouns: {
        subject: 'she',
        object: 'her',
        possessive: 'her',
        possessiveStrong: 'hers',
        reflexive: 'herself',
        linkingVerbs: LINKING_VERB_PROFILES.singular,
      },
      trust: 0,
    };
  }

  render() {
    const eventText = runTemplate(EVENT_TEXT_TEMPLATES, this.state, 1);
    const petText = runTemplate(PETTING_TEXT_TEMPLATES, this.state, 4);
    const nameText = runTemplate(SPRITE_NAME_TEMPLATES, this.state, 2);
    return (
      <div className="App">
        <img src={`img/sprites/${this.state.species}/saylian.png`} alt={this.state.species} />
        <h2>{nameText}</h2>
        <p>{eventText}</p>
        <button
          onClick={() => this.setState({'trust': this.state.trust + 1})}
        >{petText}</button>
      </div>
    );
  }
}

export default App;
