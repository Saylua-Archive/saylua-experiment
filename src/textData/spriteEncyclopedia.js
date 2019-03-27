export const SPRITE_ENCYCLOPEDIA = {
  arko: {
    species: 'arko',

    vocab: {
      coat: 'fur',
      chirp: 'bark',
      purr: 'pant',
      growl: 'growl',
      nose: 'nose',
    },

    grammar: {
      plural: 'arkos',
      article: 'an',
    },

    facesRight: true,
    headshotCoordinates: {
      x: 220,
      y: 100,
      size: 130,
    },

    description: `Arkos are pensive companions who are usually quite
      loyal to their human guardians. They don't bite, but they do have a
      tendency to be mouthy when showing their affection.`,
    quotes: [
      {
        text: `They're mostly quiet. But you can hear their loyalty in their
          gentle pawsteps. And you should always listen when an arko barks.`,
        attribution: 'Vera Everly',
      },
    ],

    // Size is stored in inches.
    sizeMean: 40,
    sizeVariance: 5,
    sizeName: 'length',

    // Weight is stored in pounds.
    weightMean: 50,
    weightVariance: 5,
  },
  chirling: {
    species: 'chirling',

    vocab: {
      coat: 'down',
      chirp: 'chirp',
      purr: 'coo',
      growl: 'squawk',
      nose: 'beak',
    },

    grammar: {
      plural: 'chirlings',
      article: 'a',
    },

    facesRight: true,
    headshotCoordinates: {
      x: 110,
      y: 60,
      size: 120,
    },

    description: `Chirlings are highly energetic sprites who can
      frequently be heard chirping across the forest. New guardians often find
      themselves overwhelmed with attention when caring for a chirling.`,
    quotes: [
      {
        text: `The chirlings would chirp so loudly I couldn't sleep. But after
          the day they disappeared, I felt that some part of me had disappeared
          as well.`,
        attribution: 'Anonymous',
      },
    ],

    // Size is stored in inches.
    sizeMean: 50,
    sizeVariance: 10,
    sizeName: 'wingspan',

    // Weight is stored in pounds.
    weightMean: 20,
    weightVariance: 5,
  },
  loxi: {
    species: 'loxi',

    vocab: {
      coat: 'down',
      chirp: 'grumble',
      purr: 'purr',
      growl: 'growl',
      nose: 'nose',
    },

    grammar: {
      plural: 'loxis',
      article: 'a',
    },

    facesRight: false,
    headshotCoordinates: {
      x: 70,
      y: 100,
      size: 120,
    },

    description: `Loxis are fierce wild creatures found in the Dawnlands.
      They are known for being highly territorial and have a tendency to only
      show respect to those who can defeat them in combat.`,
    quotes: [
      {
        text: `Just trust me on this. It was never your den. You are a guest in
          that loxi's house`,
        attribution: 'Anonymous',
      },
    ],

    // Size is stored in inches.
    sizeMean: 80,
    sizeVariance: 20,
    sizeName: 'length',

    // Weight is stored in pounds.
    weightMean: 100,
    weightVariance: 10,
  },
  gam: {
    species: 'gam',

    vocab: {
      coat: 'fur',
      chirp: 'baa',
      purr: 'hum',
      growl: 'bleat',
      nose: 'nose',
    },

    grammar: {
      plural: 'gams',
      article: 'a',
    },

    facesRight: true,
    headshotCoordinates: {
      x: 210,
      y: 10,
      size: 120,
    },

    description: `Gams are hardy creatures who can be seen frolicking
      across many regions in Saylua.`,
    quotes: [
      {
        text: `My gam has coarse fur, sharp horns, and hard hooves. Her voice
          is rough as sand. And still, she's the gentlest beast I know.`,
        attribution: 'Anonymous',
      },
    ],

    // Size is stored in inches.
    sizeMean: 48,
    sizeVariance: 10,
    sizeName: 'Height',

    // Weight is stored in pounds.
    weightMean: 100,
    weightVariance: 20,
  },
};

export const SPRITE_COATS = {
  arko: ['albino', 'earthen', 'luarian', 'melanistic', 'piebald', 'saylian'],
  chirling: ['albino', 'luarian', 'melanistic', 'piebald', 'saylian'],
  eydrun: ['albino', 'luarian', 'melanistic', 'piebald', 'saylian'],
  fleuran: ['albino', 'calico', 'luarian', 'melanistic', 'piebald', 'saylian'],
  gam: ['albino', 'common', 'luarian', 'melanistic', 'piebald', 'saylian'],
  gorbin: ['albino', 'luarian', 'melanistic', 'piebald', 'saylian'],
  loxi: ['albino', 'luarian', 'melanistic', 'piebald', 'saylian'],
  nibian: ['albino', 'luarian', 'melanistic', 'piebald', 'saylian'],
  senrix: ['albino', 'earthen', 'luarian', 'melanistic', 'piebald', 'saylian'],
  vela: ['albino', 'dawnish', 'luarian', 'melanistic', 'piebald', 'saylian'],
};
