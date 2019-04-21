import { Their, They_re, They, their, they,
  them } from '../textHelpers/pronouns';
import { token, coat, chirp, purr, growl, nose, chirling, a_chirling,
  chirlings, Kimberly, purring, chirping, purrs, chirps, growls } from '../textHelpers/interactions';

import { _v, spriteText } from '../textHelpers/helpers';

// Texts to be added when a trust level is achieved.
export const TRUST_INCREASE_TEMPLATES = {
  bonded: [
    sprite => ({
      text: spriteText(sprite)`${They} ${_v('seem')} interested in getting
        to know you.`,
      kaomoji: 'eager',
    }),
    sprite => ({
      text: spriteText(sprite)`${They} want to become your companion.`,
      kaomoji: 'comfortable',
    }),
  ],
  curious: [
    sprite => ({
      text: spriteText(sprite)`${Kimberly} ${purrs} happily.`,
      kaomoji: 'preen',
    }),
    sprite => ({
      text: spriteText(sprite)`${Kimberly} feels more comfortable around you.`,
      kaomoji: 'comfortable',
    }),
  ],
  friendly: [
    sprite => ({
      text: spriteText(sprite)`${Kimberly} trusts you.`,
      kaomoji: 'excited',
    }),
    sprite => ({
      text: spriteText(sprite)`${Kimberly} is happy to know you.`,
      kaomoji: 'excited',
    }),
  ],
};

export const APPROACH_TEMPLATES = {
  comfortable: [
    sprite => ({
      text: spriteText(sprite)`${They} ${_v('seem')} comfortable with your presence.`,
      kaomoji: 'comfortable',
    }),
  ],
  anxious: [
    sprite => ({
      text: spriteText(sprite)`${They} ${_v('seem')} anxious. You might be moving too quickly.`,
      kaomoji: 'anxious',
    }),
  ],
};

export const WAIT_TEMPLATES = {
  comfortable: [
    sprite => ({
      text: spriteText(sprite)`${They} ${_v('look')} bored.`,
      kaomoji: 'bored',
    }),
  ],
  anxious: [
    sprite => ({
      text: spriteText(sprite)`You give ${them} a little space. ${They} ${_v('look')} a little calmer.`,
      kaomoji: 'calmer',
    }),
  ],
};

export const PET_TEMPLATES = {
  wild: [
    sprite => ({
      text: spriteText(sprite)`As you approach, the ${chirling} tucks in
        ${their} ${coat} and scurries away. ${They_re} hiding under a bush now.`,
      kaomoji: 'anxious',
    }),
  ],
  bonded: [
    sprite => ({
      text: spriteText(sprite)`The ${chirling} peeks ${their}
        head out of the bush. ${They} ${_v('cock')}
        ${their} head curiously. But as you reach out your
        hand, ${they} quickly ${_v('retreat')} back into
        the bushes.`,
      kaomoji: 'anxious',
    }),
    sprite => ({
      text: spriteText(sprite)`You wait patiently outside the bush with your hand gently
        extended. The ${chirling} slowly emerges from the leaves,
        ${purring} softly, gently. You stroke ${their}
        silky smooth ${coat}, caressing each tuft carefully.`,
      kaomoji: 'calmer',
    }),
  ],
  curious: [
    sprite => ({
      text: spriteText(sprite)`The ${chirling} ${purrs} delicately. You're petting
        ${them}!`,
      kaomoji: 'excited',
    }),
    sprite => ({
      text: spriteText(sprite)`You look around. You don't notice ${Kimberly} anywhere.
        Did ${they} leave? Tuning in intently, you make out a muted
        ${chirping} sound, coming from behind a rock. You can see ${Kimberly}'s
        ${nose}. ${Their} eyes. As you approach, ${they}
        ${_v('take')} a few hops forward. ${Kimberly}
        ${purrs} as you pet ${them}.`,
      kaomoji: 'eager',
    }),
  ],
  friendly: [
    sprite => ({
      text: spriteText(sprite)`You're sitting in a meadow with ${Kimberly} and start gently
        stroking ${their} ${coat}. It's a warm day, and ${Kimberly}
        is so very soft.`,
      kaomoji: 'comfortable',
    }),
    sprite => ({
      text: spriteText(sprite)`As you smile at ${Kimberly}, ${they}
        ${_v('approach', 'approaches')} you, eager to receive
        your delicate pets.`,
      kaomoji: 'eager',
    }),
    sprite => ({
      text: spriteText(sprite)`The sun shines brightly on you and ${Kimberly} as you
        stroke ${their} ${coat}.`,
      kaomoji: 'preen',
    }),
    sprite => ({
      text: spriteText(sprite)`${Kimberly} ${purrs} happily as you stroke ${their}
        ${coat}.`,
      kaomoji: 'excited',
    }),
    sprite => ({
      text: spriteText(sprite)`${Kimberly} seems a bit aloof when you try to pet
        ${them}.`,
      kaomoji: 'bored',
    }),
    sprite => ({
      text: spriteText(sprite)`${Kimberly} longingly looks into the distance, seeming
        curious about adventure.`,
      kaomoji: 'bored',
    }),
    sprite => ({
      text: spriteText(sprite)`Gently cleaning ${their} ${coat},
        ${Kimberly} preens a bit.`,
      kaomoji: 'preen',
    }),
    sprite => ({
      text: spriteText(sprite)`You give ${Kimberly} a little pat on the head.`,
      kaomoji: 'comfortable',
    }),
    sprite => ({
      text: spriteText(sprite)`${Kimberly} brings you a little ${token}.`,
      kaomoji: 'treat',
    }),
  ],
};

export const WATER_TEMPLATES = {
  wild: [
    sprite => ({
      text: spriteText(sprite)`You place a bowl of water on the ground and step back.
        The ${chirling} cautiously approaches and takes a sip.`,
      kaomoji: 'anxious',
    }),
    sprite => ({
      text: spriteText(sprite)`You have to turn your back and pretend to not notice,
        but eventually the ${chirling} takes a drink.`,
      kaomoji: 'worried',
    }),
  ],
  bonded: [
    sprite => ({
      text: spriteText(sprite)`The ${chirling} sips the water, keeping
        ${their} eyes on you.`,
      kaomoji: 'bored',
    }),
    sprite => ({
      text: spriteText(sprite)`The water dish is the perfect size for a
        thirsty ${chirling}.`,
      kaomoji: 'calmer',
    }),
  ],
  curious: [
    sprite => ({
      text: spriteText(sprite)`${Kimberly} was thirsty. ${They} greedily
        ${_v('lap')} up the water.`,
      kaomoji: 'eager',
    }),
    sprite => ({
      text: spriteText(sprite)`${Kimberly} sips the water. ${They}
        ${purrs} happily.`,
      kaomoji: 'excited',
    }),
  ],
  friendly: [
    sprite => ({
      text: spriteText(sprite)`${Kimberly} perks up at the sight of
        ${their} water dish. They gulp it down with a happy ${chirp}.`,
      kaomoji: 'eager',
    }),
    sprite => ({
      text: spriteText(sprite)`${Kimberly} slurps and spills a bit of the water.`,
      kaomoji: 'eager',
    }),
    sprite => ({
      text: spriteText(sprite)`The sweet water was just what ${Kimberly} wanted.`,
      kaomoji: 'comfortable',
    }),
  ],
};

export const GROOM_TEMPLATES = {
  wild: [
    sprite => ({
      text: spriteText(sprite)`The ${chirling}'s ${growls} as you get close.`,
      kaomoji: 'worried',
    }),
    sprite => ({
      text: spriteText(sprite)`The ${chirling} pulls away after a quick pat.`,
      kaomoji: 'anxious',
    }),
  ],
  bonded: [
    sprite => ({
      text: spriteText(sprite)`The ${chirling} lets you pull a few bits of dirt
        out of ${their} ${coat}.`,
      kaomoji: 'calmer',
    }),
    sprite => ({
      text: spriteText(sprite)`The ${chirling}'s ${coat} feels rough.`,
      kaomoji: 'comfortable',
    }),
  ],
  curious: [
    sprite => ({
      text: spriteText(sprite)`You tenderly groom ${Kimberly}'s ${coat}.`,
      kaomoji: 'preen',
    }),
    sprite => ({
      text: spriteText(sprite)`${Kimberly} ${purrs} softly as you groom
        ${their} ${coat}.`,
      kaomoji: 'comfortable',
    }),
  ],
  friendly: [
    sprite => ({
      text: spriteText(sprite)`${Kimberly} eagerly presents ${their}
        ${coat} for cleaning. You make sure to start with
        ${their} favorite spot.`,
      kaomoji: 'eager',
    }),
    sprite => ({
      text: spriteText(sprite)`${Kimberly}'s ${coat} feels soft and fluffy
        after you groom it.`,
      kaomoji: 'preen',
    }),
  ],
};

export const TREAT_TEMPLATES = {
  wild: [
    sprite => ({
      text: spriteText(sprite)`You gently place a treat on the ground. It's specially
        formulated for ${chirlings}.`,
      kaomoji: 'treat',
    }),
    sprite => ({
      text: spriteText(sprite)`The ${chirling} takes the treat when you're not looking.`,
      kaomoji: 'treat',
    }),
  ],
  bonded: [
    sprite => ({
      text: spriteText(sprite)`The ${chirling} perks up at the smell of the treat.
        ${They} ${_v('come')} up to you to get it.`,
      kaomoji: 'treat',
    }),
    sprite => ({
      text: spriteText(sprite)`That's one hungry ${chirling}. ${They}
        ${_v('grab')} the treat as soon as you set it down.`,
      kaomoji: 'treat',
    }),
  ],
  curious: [
    sprite => ({
      text: spriteText(sprite)`The ${chirling} snaps the treat right out of your hand.`,
      kaomoji: 'treat',
    }),
    sprite => ({
      text: spriteText(sprite)`${Kimberly} devours the treat. ${Their} eyes
        turn toward you expectantly...`,
      kaomoji: 'treat',
    }),
  ],
  friendly: [
    sprite => ({
      text: spriteText(sprite)`You toss the treat into the air. ${Kimberly} catches
        it with ease. Just like you've practiced.`,
      kaomoji: 'treat',
    }),
    sprite => ({
      text: spriteText(sprite)`${Kimberly} almost knocks you down trying to grab
        the treat.`,
      kaomoji: 'treat',
    }),
  ],
};

export const SING_TEMPLATES = {
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
