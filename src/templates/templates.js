import { Their, TheyRe, They, their, they,
  them } from '../textGenerators/pronouns';
import { token, coat, call, purr, growl, nose } from '../textGenerators/interactions';
import { randomChoice } from '../helpers/utils';

const pickGenerator = (templateList, sprite) => randomChoice(templateList)(sprite);

export const YOU_HAVE_BONDED_TEMPLATES = [
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
export const EVENT_TEXT_TEMPLATES = ([
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
