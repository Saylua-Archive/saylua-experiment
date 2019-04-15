export const TRUST_LEVELS = {
  wild: -6,
  curious: 1,
  friendly: 2,
  bonded: 3,
};

export function getTrustLevel(trust) {
  const levels = Object.keys(TRUST_LEVELS);

  for (let i = levels.length - 1; i >= 0; i--) {
    const lvl = levels[i];
    if (trust > TRUST_LEVELS[lvl]) return lvl;
  }
  return 'wild';
}
