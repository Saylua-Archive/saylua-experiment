import WildernessView from '../WildernessView/WildernessView';
import CityView from '../CityView/CityView';
import CaveView from '../CaveView/CaveView';

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
    treeImg: 'tree',
    overlayColor: { r: 194, g: 218, b: 218, a: 0.3 },
    horizon: 0.3,
  },
  luaria: {
    name: 'Luaria',
    canonName: 'luaria',
    availableSpecies: {
      common: ['arko', 'senrix'],
      rare: ['eydrun'],
    },
    view: WildernessView,
    treeImg: 'tree2_small',
    overlayColor: { r: 50, g: 40, b: 60, a: 0.5 },
    horizon: 0.3,
  },
  sayleus: {
    name: 'Sayleus',
    canonName: 'sayleus',
    availableSpecies: {
      common: ['chirling', 'gam'],
      rare: ['vela'],
    },
    view: WildernessView,
    treeImg: 'tree2_small',
    overlayColor: { r: 140, g: 190, b: 200, a: 0.3 },
    horizon: 0.3,
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
  cave: {
    name: 'The Caves',
    canonName: 'cave',
    view: CaveView,
  },
};
