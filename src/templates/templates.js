import { Their, They_re, They, their, they,
  them } from '../textGenerators/pronouns';
import { token, coat, chirp, purr, growl, nose, chirling, a_chirling,
  chirlings, Kimberly } from '../textGenerators/interactions';
import { _n, _v } from '../textGenerators/helpers';

// Texts to be added when a trust level is acheived
export const TRUST_INCREASE_TEMPLATES = {
  curious: [
    sprite => `${They(sprite)} ${_v('seem')(sprite)} interested in getting
      to know you.`,
    sprite => `${They_re(sprite)} looking a little less nervous.`,
  ],
  friendly: [
    sprite => `${They(sprite)} ${_v('tell')(sprite)} you that ${their(sprite)}
      name is ${Kimberly(sprite)}.`,
  ],
  bonded: [
    sprite => `${Kimberly(sprite)} trusts you and wants to stay with you!`,
    sprite => `${Kimberly(sprite)} is ready to become your companion!`,
  ],
};

export const TREAT_GIFT_TEMPLATES = [
  (sprite, treats) => `${Kimberly(sprite)} twirls around as ${they(sprite)}
    ${_v('give')(sprite)} you ${treats} ${_n('treat')(treats)}.`,
  (sprite, treats) => `${Kimberly(sprite)} ${purr(sprite)}s gently as
    ${they(sprite)} ${_v('reveal')(sprite)} a gift: ${treats}
    ${_n('treat')(treats)}.`,
  (sprite, treats) => `${Kimberly(sprite)} excitedly hands you
    ${treats} ${_n('treat')(treats)}.`,
  (sprite, treats) => `${Kimberly(sprite)} celebrates your friendship by
    giving you ${treats} ${_n('treat')(treats)}.`,
];

export const PET_TEMPLATES = {
  wild: [
    sprite => `In the distance, you see ${a_chirling(sprite)}.`,
    sprite => `As you approach, the ${chirling(sprite)} tucks in
      ${their(sprite)} ${coat(sprite)} and scurries away.
      ${They_re(sprite)} hiding under a bush now.`,
  ],
  curious: [
    sprite => `The ${chirling(sprite)} peeks ${their(sprite)}
      head out of the bush. ${They(sprite)} ${_v('cock')(sprite)}
      ${their(sprite)} head curiously. But as you reach out your
      hand, ${they(sprite)} quickly ${_v('retreat')(sprite)} back into
      the bushes.`,
    sprite => `You wait patiently outside the bush with your hand gently
      extended. The ${chirling(sprite)} slowly emerges from the leaves,
      ${purr(sprite)}ing softly, gently. You stroke ${their(sprite)}
      silky smooth ${coat(sprite)}, caressing each tuft carefully.`,

  ],
  friendly: [
    sprite => `The ${chirling(sprite)} ${purr(sprite)}s delicately. You're petting
      ${them(sprite)}!`,
    sprite => `You look around. You don't notice ${Kimberly(sprite)} anywhere.
      Did ${they(sprite)} leave? Tuning in intently, you make out a muted
      ${chirp(sprite)}ing sound, coming from behind a rock. You can see ${Kimberly(sprite)}'s
      ${nose(sprite)}. ${Their(sprite)} eyes. As you approach, ${they(sprite)}
      ${_v('take')(sprite)} a few hops forward. ${Kimberly(sprite)}
      ${purr(sprite)}s as you pet ${them(sprite)}.`,
  ],
  bonded: [
    sprite => `You're sitting in a meadow with ${Kimberly(sprite)} and start gently
      stroking ${their(sprite)} ${coat(sprite)}. It's a warm day, and ${Kimberly(sprite)}
      is so very soft.`,
    sprite => `As you smile at ${Kimberly(sprite)}, ${they(sprite)}
      ${_v('approach', 'approaches')(sprite)} you, eager to receive
      your delicate pets.`,
    sprite => `The sun shines brightly on you and ${Kimberly(sprite)} as you
      stroke ${their(sprite)} ${coat(sprite)}.`,
    sprite => `${Kimberly(sprite)} ${purr(sprite)}s happily as you stroke ${their(sprite)}
      ${coat(sprite)}.`,
    sprite => `${Kimberly(sprite)} seems a bit aloof when you try to pet
      ${them(sprite)}.`,
    sprite => `${Kimberly(sprite)} longingly looks into the distance, seeming
      curious about adventure.`,
    sprite => `Gently cleaning ${their(sprite)} ${coat(sprite)},
      ${Kimberly(sprite)} preens a bit.`,
    sprite => `You give ${Kimberly(sprite)} a little pat on the head.`,
    sprite => `${Kimberly(sprite)} brings you a little ${token(sprite)}.`,
  ],
};

export const WATER_TEMPLATES = {
  wild: [
    sprite => `You place a bowl of water on the ground and step back.
      The ${chirling(sprite)} cautiously approaches and takes a sip.`,
    sprite => `You have to turn your back and pretend to not notice,
      but eventually the ${chirling(sprite)} takes a drink.`,
  ],
  curious: [
    sprite => `The ${chirling(sprite)} sips the water, keeping
      ${their(sprite)} eyes on you.`,
    sprite => `The water dish is the perfect size for a
      thirsty ${chirling(sprite)}.`,
  ],
  friendly: [
    sprite => `${Kimberly(sprite)} was thirsty. ${They(sprite)} greedily
      ${_v('lap')(sprite)} up the water.`,
    sprite => `${Kimberly(sprite)} sips the water. ${They(sprite)}
      ${purr(sprite)}s happily.`,
  ],
  bonded: [
    sprite => `${Kimberly(sprite)} perks up at the sight of
      ${their(sprite)} water dish. They gulp it down with a happy ${chirp(sprite)}.`,
    sprite => `${Kimberly(sprite)} slurps and spills a bit of the water.`,
    sprite => `The sweet water was just what ${Kimberly(sprite)} wanted.`,
  ],
};

export const GROOM_TEMPLATES = {
  wild: [
    sprite => `The ${chirling(sprite)}'s ${growl(sprite)}s as you get close.`,
    sprite => `The ${chirling(sprite)} pulls away after a quick pat.`,
  ],
  curious: [
    sprite => `The ${chirling(sprite)} lets you pull a few bits of dirt
      out of ${their(sprite)} ${coat(sprite)}.`,
    sprite => `The ${chirling(sprite)}'s ${coat(sprite)} feels rough.`,
  ],
  friendly: [
    sprite => `You tenderly groom ${Kimberly(sprite)}'s ${coat(sprite)}.`,
    sprite => `${Kimberly(sprite)} ${purr(sprite)}s softly as you groom
      ${their(sprite)} ${coat(sprite)}.`,
  ],
  bonded: [
    sprite => `${Kimberly(sprite)} eagerly presents ${their(sprite)}
      ${coat(sprite)} for cleaning. You make sure to start with
      ${their(sprite)} favorite spot.`,
    sprite => `${Kimberly(sprite)}'s ${coat(sprite)} feels soft and fluffy
      after you groom it.`,
  ],
};

export const TREAT_TEMPLATES = {
  wild: [
    sprite => `You gently place a treat on the ground. It's specially
      formulated for ${chirlings(sprite)}.`,
    sprite => `The ${chirling(sprite)} takes the treat when you're not looking.`,
  ],
  curious: [
    sprite => `The ${chirling(sprite)} perks up at the smell of the treat.
      ${They(sprite)} ${_v('come')(sprite)} up to you to get it.`,
    sprite => `That's one hungry ${chirling(sprite)}. ${They(sprite)}
      ${_v('grab')(sprite)} the treat as soon as you set it down.`,
  ],
  friendly: [
    sprite => `The ${chirling(sprite)} snaps the treat right out of your hand.`,
    sprite => `${Kimberly(sprite)} devours the treat. ${Their(sprite)} eyes
      turn toward you expectantly...`,
  ],
  bonded: [
    sprite => `You toss the treat into the air. ${Kimberly(sprite)} catches
      it with ease. Just like you've practiced.`,
    sprite => `${Kimberly(sprite)} almost knocks you down trying to grab
      the treat.`,
  ],
};

export const SING_TEMPLATES = {
  wild: [
    sprite => `The ${chirling(sprite)} ${growl(sprite)}s at you.`,
    sprite => `The ${chirling(sprite)} runs off, but you can see them
      listening from the bushes.`,
  ],
  curious: [
    sprite => `The ${chirling(sprite)} gives you a quizzical look.`,
    sprite => `The ${chirling(sprite)} ${chirp(sprite)}s happily.`,
  ],
  friendly: [
    sprite => `You sing a little song for ${Kimberly(sprite)}.
      ${They_re(sprite)} ${chirp(sprite)}ing along.`,
    sprite => `${Kimberly(sprite)} ${purr(sprite)}s happily as you sing.`,
  ],
  bonded: [
    sprite => `${Kimberly(sprite)} ${purr(sprite)}s along as you sing.`,
    sprite => `${Kimberly(sprite)} ${chirp(sprite)}s to the beat.`,
    sprite => `${Kimberly(sprite)} cuddles up as you sing a
      lullaby.`,
  ],
};
