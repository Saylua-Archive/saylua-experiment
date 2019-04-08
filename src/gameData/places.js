import WildernessView from '../modules/WildernessView/WildernessView';
import CityView from '../modules/CityView/CityView';

// eslint-disable-next-line import/prefer-default-export
export const PLACES = {
  dawnlands: {
    name: 'Dawnlands',
    canonName: 'dawnlands',
    availableSpecies: {
      common: ['gam', 'senrix'],
      rare: ['loxi'],
    },
    view: WildernessView,
  },
  luaria: {
    name: 'Luaria',
    canonName: 'luaria',
    availableSpecies: {
      common: ['arko', 'senrix'],
      rare: ['eydrun'],
    },
    view: WildernessView,
  },
  sayleus: {
    name: 'Sayleus',
    canonName: 'sayleus',
    availableSpecies: {
      common: ['chirling', 'gam'],
      rare: ['vela'],
    },
    view: WildernessView,
  },
  estanya: {
    name: 'Estanya City',
    canonName: 'estanya',
    view: CityView,
  },
  home: {
    name: 'My Home',
    canonName: 'home',
    view: CityView,
  },
};
