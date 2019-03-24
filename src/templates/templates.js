import { Their, TheyRe, They, their, they,
  them } from '../textGenerators/pronouns';
import { token, coat, call, purr, growl, nose } from '../textGenerators/interactions';

// Texts to be added when a trust level is acheived
export const TRUST_INCREASE_TEMPLATES = {
  curious: [
    () => 'They seems intrested in getting to know you.',
    sprite => `${TheyRe(sprite)} looking a little less nervous.`,
  ],
  friendly: [
    sprite => `They tell you that ${their(sprite)} name is ${sprite.name}.`,
  ],
  bonded: [
    sprite => `${sprite.name} trusts you and wants to stay with you!`,
    sprite => `${sprite.name} is ready to become your companion!`,
  ],
};

export const PET_TEMPLATES = {
  wild: [
    sprite => `In the distance, you see a ${sprite.species}.`,
    sprite => `As you approach, the ${sprite.species} tucks in ${their(sprite)}
      ${coat(sprite)} and scurries away. ${TheyRe(sprite)} hiding under a bush now.`,
  ],
  curious: [
    sprite => `The ${sprite.species} peeks ${their(sprite)}
      head out of the bush. ${They(sprite)} cocks ${their(sprite)} head
      curiously. But as you reach out your hand, ${they(sprite)}
      quickly retreats back into the bushes.`,
    sprite => `You wait patiently outside the bush with your hand gently
      extended. The ${sprite.species} slowly emerges from the leaves,
      ${purr(sprite)}ing softly, gently. You stroke ${their(sprite)}
      silky smooth ${coat(sprite)}, caressing each tuft carefully.`,

  ],
  friendly: [
    sprite => `The ${sprite.species} ${purr(sprite)}s delicately. You're petting
      ${them(sprite)}!`,
    sprite => `You look around. You don't notice ${sprite.name} anywhere.
      Did ${they(sprite)} leave? Tuning in intently, you make out a muted
      ${call(sprite)}ing sound, coming from behind a rock. You can see ${sprite.name}'s
      ${nose(sprite)}. ${Their(sprite)} eyes. As you approach, ${they(sprite)} take a few
      hops forward. ${sprite.name} ${purr(sprite)}s as you pet ${them(sprite)}.`,
  ],
  bonded: [
    sprite => `You're sitting in a meadow with ${sprite.name} and start gently
      stroking ${their(sprite)} ${coat(sprite)}. It's a warm day, and ${sprite.name}
      is so very soft.`,
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
  ],
};

export const WATER_TEMPLATES = {
  wild: [
    sprite => `You place a bowl of water on the ground and step back. The ${sprite.species} cautiously approaches and takes a sip.`,
    sprite => `You have to turn your back and pretend to not notice, but eventually the ${sprite.species} takes a drink.`,
  ],
  curious: [
    sprite => `The ${sprite.species} sips the water, keeping ${their(sprite)} eyes on you.`,
    sprite => `The water dish is the perfect size for a thirsty ${sprite.species}.`,
  ],
  friendly: [
    sprite => `${sprite.name} was thirsty! ${They(sprite)} greedily lap up the water.`,
    sprite => `${sprite.name} sips the water. ${They(sprite)} ${purr(sprite)}s happily.`,
  ],
  bonded: [
    sprite => `${sprite.name} perks up at the sight of ${their(sprite)} water dish. They gulp it down with a happy ${call(sprite)}.`,
    sprite => `${sprite.name} slurps and spills a bit of the water.`,
    sprite => `The sweet water was just what ${sprite.name} wanted!`,
  ],
};

export const GROOM_TEMPLATES = {
  wild: [
    sprite => `The ${sprite.species}'s ${growl(sprite)}s as you get close.`,
    sprite => `The ${sprite.species} pulls away after a quick pat.`,
  ],
  curious: [
    sprite => `The ${sprite.species} lets you pull a few bits of dirt out of ${their(sprite)} ${coat(sprite)}.`,
    sprite => `The ${sprite.species}'s ${coat(sprite)} feels rough.`,
  ],
  friendly: [
    sprite => `You tenderly groom ${sprite.name}'s ${coat(sprite)}.`,
    sprite => `${sprite.name} ${purr(sprite)}s softly as you groom ${their(sprite)} ${coat(sprite)}.`,
  ],
  bonded: [
    sprite => `${sprite.name} eagerly presents ${their(sprite)} ${coat(sprite)} for cleaning. You make sure to start with ${their(sprite)} favorite spot.`,
    sprite => `${sprite.name}'s ${coat(sprite)} feels soft and fluffy after you groom it.`,
  ],
};

export const TREAT_TEMPLATES = {
  wild: [
    sprite => `You gently place a treat on the ground. It's specially formulated for ${sprite.species}s!`,
    sprite => `The ${sprite.species} takes the treat when they think you're not looking.`,
  ],
  curious: [
    sprite => `The ${sprite.species} perks up at the smell of the treat. They come up to you to get it.`,
    sprite => `That's one hungry ${sprite.species}! ${They(sprite)} grab the treat as soon as you set it down.`,
  ],
  friendly: [
    sprite => `The ${sprite.species} snaps the treat right out of your hand!`,
    sprite => `${sprite.name} devours the treat. ${Their(sprite)} eyes turn toward you expectantly...`,
  ],
  bonded: [
    sprite => `You toss the treat into the air. ${sprite.name} catches it with ease!`,
    sprite => `${sprite.name} almost knocks you down trying to grab the treat.`,
  ],
};

export const SING_TEMPLATES = {
  wild: [
    sprite => `The ${sprite.species} ${growl(sprite)}s at you.`,
    sprite => `The ${sprite.species} runs off, but you can see them listening from the bushes.`,
  ],
  curious: [
    sprite => `The ${sprite.species} gives you a quizzical look.`,
    sprite => `The ${sprite.species} ${call(sprite)}s happily.`,
  ],
  friendly: [
    sprite => `You sing a little song for ${sprite.name}. ${TheyRe(sprite)} ${call(sprite)}ing along!`,
    sprite => `${sprite.name} ${purr(sprite)}'s happily as you sing.`,
  ],
  bonded: [
    sprite => `${sprite.name} ${purr(sprite)}'s along as you sing.`,
    sprite => `${sprite.name} ${call(sprite)}'s to the beat!`,
    sprite => `${sprite.name} cuddles up against you as you sing a lullaby.`,
  ],
};
