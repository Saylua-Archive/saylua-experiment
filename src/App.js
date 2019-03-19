import React, { Component } from 'react';

import soulName from './helpers/name/soulName';
import { capitalizeFirst, randomChoice } from './helpers/utils';
import './App.css';

import SpritePortrait from './sharedComponents/SpritePortrait/SpritePortrait';
import SpriteHeadshot from './sharedComponents/SpriteHeadshot/SpriteHeadshot';

import { INTERACTION_TYPES } from './gameData/spriteInteractions';
import { SHE_PRONOUNS, HE_PRONOUNS, THEY_PRONOUNS } from './textData/pronouns';
import { SPRITE_COATS } from './textData/spriteEncyclopedia';
import { Their, TheyRe, They, their, they,
  them } from './textGenerators/pronouns';
import { token, coat, call, purr, growl, nose } from './textGenerators/interactions';

const pickGenerator = (templateList, sprite) => randomChoice(templateList)(sprite);

const YOU_HAVE_BONDED_TEMPLATES = [
  sprite => `As you smile at ${sprite.name}, ${they(sprite)} approach you,
    eager to receive your delicate pets.`,
  sprite => `The sun shines brightly on you and ${sprite.name} as you
    stroke ${their(sprite)} ${coat(sprite)}.`,
  sprite => `${sprite.name} ${purr(sprite)}s happily as you stroke ${their(sprite)}
    ${coat(sprite)}.`,
  sprite => `${sprite.name} seems a bit aloof when you try to pet
    ${them(sprite)}.`,
  sprite => `${sprite.name} longingly looks into the distance, seeming
    curious about adventure.`,
  sprite => `Gently cleaning ${their(sprite)} ${coat(sprite)}, ${sprite.name} preens a bit.`,
  sprite => `You give ${sprite.name} a little pat on the head.`,
  sprite => `${sprite.name} brings you a little ${token(sprite)}.`,
];

// Event text template ordered linearly based on trust values.
const EVENT_TEXT_TEMPLATES = ([
  sprite => `In the distance, you see a ${sprite.species}.`,
  sprite => `As you approach, the ${sprite.species} tucks in ${their(sprite)}
    ${coat(sprite)} and scurries away. ${TheyRe(sprite)} hiding under a bush now.`,
  sprite => `The ${sprite.species} peeks ${their(sprite)}
    head out of the bush. ${They(sprite)} cocks ${their(sprite)} head
    curiously. But as you reach out your hand, ${they(sprite)}
    quickly retreats back into the bushes.`,
  sprite => `You wait patiently outside the bush with your hand gently
    extended. The ${sprite.species} slowly emerges from the leaves,
    ${purr(sprite)}ing softly, gently. You stroke ${their(sprite)}
    silky smooth ${coat(sprite)}, caressing each tuft carefully.`,
  sprite => `The ${sprite.species} ${purr(sprite)}s delicately. You're petting
    ${them(sprite)}! They tell you that they're name is ${sprite.name}.`,
  sprite => `You look around. You don't notice ${sprite.name} anywhere.
    Did ${they(sprite)} leave? Tuning in intently, you make out a muted
    ${call(sprite)}ing sound, coming from behind a rock. You can see ${sprite.name}'s
    ${nose(sprite)}. ${Their(sprite)} eyes. As you approach, ${they(sprite)} take a few
    hops forward. ${sprite.name} ${purr(sprite)}s as you pet ${them(sprite)}.`,
  sprite => `You're sitting in a meadow with ${sprite.name} and start gently
    stroking ${their(sprite)} ${coat(sprite)}. It's a warm day, and ${sprite.name}
    is so very soft.`,
  sprite => pickGenerator(YOU_HAVE_BONDED_TEMPLATES, sprite),
]);

const generateTextBasedOnTrustLevel = (templateList, sprite, trustIntervalArg) => {
  const trustInterval = trustIntervalArg || 3;
  const templateIndex = Math.max(0,
    Math.min(Math.floor(sprite.trust / trustInterval), templateList.length - 1));
  return templateList[templateIndex](sprite);
};

const generateSprite = () => {
  const species = randomChoice(['arko', 'chirling', 'loxi', 'gam']);
  const color = randomChoice(SPRITE_COATS[species]);
  return {
    name: capitalizeFirst(soulName()),
    species,
    color,
    trust: 0,
    pronouns: randomChoice([SHE_PRONOUNS, HE_PRONOUNS,
      THEY_PRONOUNS]),
  };
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dayOffset: 0,
      /**
       * Sample sprite data:
       * {
       *   lastPlayedTimestamp: 0,
       *   interactionCounts: {},
       *   trust: 0,
       * }
       */
      wildSprite: generateSprite(),
      yourSprites: {},
      activeSprite: null,
    };
  }

  currentSprite() {
    const { activeSprite, yourSprites, wildSprite } = this.state;
    if (!activeSprite) return wildSprite;
    return yourSprites[activeSprite];
  }

  befriendWildSprite(wildSprite) {
    const { yourSprites } = this.state;
    yourSprites[wildSprite.name] = wildSprite;
    const newWildSprite = generateSprite();
    this.setState({
      yourSprites,
      activeSprite: wildSprite.name,
      wildSprite: newWildSprite,
    });
  }

  currentTime() {
    const date = new Date();
    const { dayOffset } = this.state;
    date.setDate(date.getDate() + dayOffset);
    return date;
  }

  hasBeenADaySincePlaying(spriteArg) {
    const sprite = spriteArg || this.currentSprite();
    const { lastPlayedTimestamp } = sprite;
    const lastPlayed = new Date(lastPlayedTimestamp);
    const now = this.currentTime();

    return now.toDateString() !== lastPlayed.toDateString();
  }

  changeSprite(name) {
    this.setState({ activeSprite: name });
  }

  canPlay(interactionType, spriteArg) {
    const sprite = spriteArg || this.currentSprite();
    const interaction = INTERACTION_TYPES[interactionType];
    if (!interaction.maxPerDay) return true;
    let { interactionCounts } = sprite;
    interactionCounts = interactionCounts || {};
    const interacted = interactionCounts[interactionType] || 0;
    return interacted < interaction.maxPerDay
      || this.hasBeenADaySincePlaying(sprite);
  }

  interactWithSprite(interactionType, spriteArg) {
    const sprite = spriteArg || this.currentSprite();
    if (!this.canPlay(interactionType)) return;
    const { wildSprite, yourSprites, activeSprite } = this.state;

    const interaction = INTERACTION_TYPES[interactionType];
    let { interactionCounts } = sprite;
    interactionCounts = interactionCounts || {};
    interactionCounts[interactionType] = (interactionCounts[interactionType] || 0) + 1;
    if (this.hasBeenADaySincePlaying(sprite)) {
      interactionCounts = { [interactionType]: 1 };
    }

    const newTrust = sprite.trust + interaction.trustIncrease;

    const spriteChanges = {
      trust: newTrust,
      interactionCounts,
      lastPlayedTimestamp: this.currentTime().getTime(),
    };

    if (activeSprite) {
      yourSprites[activeSprite] = Object.assign({}, yourSprites[activeSprite],
        spriteChanges);
      this.setState({ yourSprites });
    } else {
      // Is a wild sprite.
      const newWildSprite = Object.assign({}, wildSprite, spriteChanges);

      if (newTrust >= 5 && !(sprite.name in yourSprites)) {
        this.befriendWildSprite(newWildSprite);
      } else {
        this.setState({ wildSprite: newWildSprite });
      }
    }
  }

  render() {
    console.log(this.state);
    const { dayOffset, yourSprites, activeSprite } = this.state;
    const now = this.currentTime();
    const sprite = this.currentSprite();
    const isWildSprite = !(sprite.name in yourSprites);
    const eventText = generateTextBasedOnTrustLevel(
      EVENT_TEXT_TEMPLATES, sprite, 1
    );

    const interactText = interactionType => (
      INTERACTION_TYPES[interactionType].buttonTextTemplate(sprite));

    const advanceDay = () => this.setState({
      dayOffset: dayOffset + 1,
    });

    const clickSprite = () => this.interactWithSprite('pet');

    return (
      <div className="App">
        <div className="sprite-list">
          <button
            type="button"
            className={`change-sprite${isWildSprite ? ' selected' : ''}`}
            onClick={() => this.changeSprite()}
          >
            ?
          </button>
          {
            Object.keys(yourSprites).map(name => (
              <button
                type="button"
                className={`change-sprite${name === activeSprite ? ' selected' : ''}`}
                key={name}
                onClick={() => this.changeSprite(name)}
              >
                <SpriteHeadshot sprite={yourSprites[name]} />
              </button>
            ))
          }
        </div>
        <div className="wilderness-background">
          <SpritePortrait
            sprite={sprite}
            petText={interactText('pet')}
            onClick={clickSprite}
          />
        </div>
        <h2>{isWildSprite ? `A wild ${sprite.species}` : sprite.name}</h2>
        <p>
          {`Trust level: ${sprite.trust}`}
        </p>
        <p className="event-text">{eventText}</p>
        {
          Object.keys(INTERACTION_TYPES).map(interaction => (
            <button
              type="button"
              key={interaction}
              onClick={() => {
                this.interactWithSprite(interaction);
              }}
              disabled={this.canPlay(interaction) ? undefined : true}
            >
              {interactText(interaction)}
            </button>
          ))
        }

        <p>
          {`The date is ${now.toLocaleString()}`}
        </p>
        <button type="button" onClick={advanceDay}>Go to sleep</button>
      </div>
    );
  }
}

export default App;
