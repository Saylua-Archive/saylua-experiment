import WildernessView from '../modules/WildernessView/WildernessView';
import CityView from '../modules/CityView/CityView';
import CaveView from '../modules/CaveView/CaveView';

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
  vangogh: {
    name: 'Van Gogh',
    canonName: 'vangogh',
    availableSpecies: {
      common: ['nibian', 'gam'],
      rare: ['fleuran'],
    },
    view: WildernessView,
    overlayColor: { r: 176, g: 207, b: 193, a: 0.2 },
    horizon: 0.4,
  },
  yoshida: {
    name: 'Yoshida',
    canonName: 'yoshida',
    availableSpecies: {
      common: ['nibian', 'gorbin'],
      rare: ['gorbin'],
    },
    view: WildernessView,
    overlayColor: { r: 35, g: 70, b: 80, a: 0.3 },
    horizon: 0.5,
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
