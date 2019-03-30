import { Their, They_re, They, their, they,
  them } from '../textGenerators/pronouns';
import { token, coat, chirp, purr, growl, nose, chirling, a_chirling,
  chirlings, Kimberly } from '../textGenerators/interactions';

import { _n, _v, spriteText } from '../textGenerators/helpers';

// Texts to be added when a trust level is acheived
export const TRUST_INCREASE_TEMPLATES = {
  curious: [
    sprite => spriteText(sprite)`${They} ${_v('seem')} interested in getting
      to know you.`,
    sprite => spriteText(sprite)`${They_re} looking a little less nervous.`,
  ],
  friendly: [
    sprite => spriteText(sprite)`You learn that ${their} name is ${Kimberly}.`,
    sprite => spriteText(sprite)`The ${chirling} looks into your eyes. Somehow, 
      you have a feeling that ${their} name is ${Kimberly}.`,
  ],
  bonded: [
    sprite => spriteText(sprite)`${Kimberly} trusts you and wants to stay with you.`,
    sprite => spriteText(sprite)`${Kimberly} is ready to become your companion.`,
  ],
};


export const TREAT_GIFT_TEMPLATES = [
  (sprite, treats) => spriteText(sprite)`${Kimberly} excitedly twirls around 
    as ${they} ${_v('give')} you ${treats} ${_n('treat')(treats)}.`,
  (sprite, treats) => spriteText(sprite)`${Kimberly} ${purr}s gently,
    revealing a gift: ${treats} ${_n('treat')(treats)}.`,
  (sprite, treats) => spriteText(sprite)`${Kimberly} excitedly hands you
    ${treats} ${_n('treat')(treats)}.`,
  (sprite, treats) => spriteText(sprite)`${Kimberly} celebrates your friendship by
    giving you ${treats} ${_n('treat')(treats)}.`,
];

export const PET_TEMPLATES = {
  wild: [
    sprite => spriteText(sprite)`In the distance, you see ${a_chirling}.`,
    sprite => spriteText(sprite)`As you approach, the ${chirling} tucks in
      ${their} ${coat} and scurries away.
      ${They_re} hiding under a bush now.`,
  ],
  curious: [
    sprite => spriteText(sprite)`The ${chirling} peeks ${their}
      head out of the bush. ${They} ${_v('cock')}
      ${their} head curiously. But as you reach out your
      hand, ${they} quickly ${_v('retreat')} back into
      the bushes.`,
    sprite => spriteText(sprite)`You wait patiently outside the bush with your hand gently
      extended. The ${chirling} slowly emerges from the leaves,
      ${purr}ing softly, gently. You stroke ${their}
      silky smooth ${coat}, caressing each tuft carefully.`,

  ],
  friendly: [
    sprite => spriteText(sprite)`The ${chirling} ${purr}s delicately. You're petting
      ${them}!`,
    sprite => spriteText(sprite)`You look around. You don't notice ${Kimberly} anywhere.
      Did ${they} leave? Tuning in intently, you make out a muted
      ${chirp}ing sound, coming from behind a rock. You can see ${Kimberly}'s
      ${nose}. ${Their} eyes. As you approach, ${they}
      ${_v('take')} a few hops forward. ${Kimberly}
      ${purr}s as you pet ${them}.`,
  ],
  bonded: [
    sprite => spriteText(sprite)`You're sitting in a meadow with ${Kimberly} and start gently
      stroking ${their} ${coat}. It's a warm day, and ${Kimberly}
      is so very soft.`,
    sprite => spriteText(sprite)`As you smile at ${Kimberly}, ${they}
      ${_v('approach', 'approaches')} you, eager to receive
      your delicate pets.`,
    sprite => spriteText(sprite)`The sun shines brightly on you and ${Kimberly} as you
      stroke ${their} ${coat}.`,
    sprite => spriteText(sprite)`${Kimberly} ${purr}s happily as you stroke ${their}
      ${coat}.`,
    sprite => spriteText(sprite)`${Kimberly} seems a bit aloof when you try to pet
      ${them}.`,
    sprite => spriteText(sprite)`${Kimberly} longingly looks into the distance, seeming
      curious about adventure.`,
    sprite => spriteText(sprite)`Gently cleaning ${their} ${coat},
      ${Kimberly} preens a bit.`,
    sprite => spriteText(sprite)`You give ${Kimberly} a little pat on the head.`,
    sprite => spriteText(sprite)`${Kimberly} brings you a little ${token}.`,
  ],
};

export const WATER_TEMPLATES = {
  wild: [
    sprite => spriteText(sprite)`You place a bowl of water on the ground and step back.
      The ${chirling} cautiously approaches and takes a sip.`,
    sprite => spriteText(sprite)`You have to turn your back and pretend to not notice,
      but eventually the ${chirling} takes a drink.`,
  ],
  curious: [
    sprite => spriteText(sprite)`The ${chirling} sips the water, keeping
      ${their} eyes on you.`,
    sprite => spriteText(sprite)`The water dish is the perfect size for a
      thirsty ${chirling}.`,
  ],
  friendly: [
    sprite => spriteText(sprite)`${Kimberly} was thirsty. ${They} greedily
      ${_v('lap')} up the water.`,
    sprite => spriteText(sprite)`${Kimberly} sips the water. ${They}
      ${purr}s happily.`,
  ],
  bonded: [
    sprite => spriteText(sprite)`${Kimberly} perks up at the sight of
      ${their} water dish. They gulp it down with a happy ${chirp}.`,
    sprite => spriteText(sprite)`${Kimberly} slurps and spills a bit of the water.`,
    sprite => spriteText(sprite)`The sweet water was just what ${Kimberly} wanted.`,
  ],
};

export const GROOM_TEMPLATES = {
  wild: [
    sprite => spriteText(sprite)`The ${chirling}'s ${growl}s as you get close.`,
    sprite => spriteText(sprite)`The ${chirling} pulls away after a quick pat.`,
  ],
  curious: [
    sprite => spriteText(sprite)`The ${chirling} lets you pull a few bits of dirt
      out of ${their} ${coat}.`,
    sprite => spriteText(sprite)`The ${chirling}'s ${coat} feels rough.`,
  ],
  friendly: [
    sprite => spriteText(sprite)`You tenderly groom ${Kimberly}'s ${coat}.`,
    sprite => spriteText(sprite)`${Kimberly} ${purr}s softly as you groom
      ${their} ${coat}.`,
  ],
  bonded: [
    sprite => spriteText(sprite)`${Kimberly} eagerly presents ${their}
      ${coat} for cleaning. You make sure to start with
      ${their} favorite spot.`,
    sprite => spriteText(sprite)`${Kimberly}'s ${coat} feels soft and fluffy
      after you groom it.`,
  ],
};

export const TREAT_TEMPLATES = {
  wild: [
    sprite => spriteText(sprite)`You gently place a treat on the ground. It's specially
      formulated for ${chirlings}.`,
    sprite => spriteText(sprite)`The ${chirling} takes the treat when you're not looking.`,
  ],
  curious: [
    sprite => spriteText(sprite)`The ${chirling} perks up at the smell of the treat.
      ${They} ${_v('come')} up to you to get it.`,
    sprite => spriteText(sprite)`That's one hungry ${chirling}. ${They}
      ${_v('grab')} the treat as soon as you set it down.`,
  ],
  friendly: [
    sprite => spriteText(sprite)`The ${chirling} snaps the treat right out of your hand.`,
    sprite => spriteText(sprite)`${Kimberly} devours the treat. ${Their} eyes
      turn toward you expectantly...`,
  ],
  bonded: [
    sprite => spriteText(sprite)`You toss the treat into the air. ${Kimberly} catches
      it with ease. Just like you've practiced.`,
    sprite => spriteText(sprite)`${Kimberly} almost knocks you down trying to grab
      the treat.`,
  ],
};

export const SING_TEMPLATES = {
  wild: [
    sprite => spriteText(sprite)`The ${chirling} ${growl}s at you.`,
    sprite => spriteText(sprite)`The ${chirling} runs off, but you can see them
      listening from the bushes.`,
  ],
  curious: [
    sprite => spriteText(sprite)`The ${chirling} gives you a quizzical look.`,
    sprite => spriteText(sprite)`The ${chirling} ${chirp}s happily.`,
  ],
  friendly: [
    sprite => spriteText(sprite)`You sing a little song for ${Kimberly}.
      ${They_re} ${chirp}ing along.`,
    sprite => spriteText(sprite)`${Kimberly} ${purr}s happily as you sing.`,
  ],
  bonded: [
    sprite => spriteText(sprite)`${Kimberly} ${purr}s along as you sing.`,
    sprite => spriteText(sprite)`${Kimberly} ${chirp}s to the beat.`,
    sprite => spriteText(sprite)`${Kimberly} cuddles up as you sing a
      lullaby.`,
  ],
};
