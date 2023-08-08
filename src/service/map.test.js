import {
  getCenter,
  getBounds,
  getTier,
  getTierVariant,
  getFlagVariant,
  getDisplayTime,
} from './map';

describe('getCenter', () => {
  it('calculates the center correctly', () => {
    const stores = [
      { latitude: 10, longitude: 20 },
      { latitude: 15, longitude: 25 },
      { latitude: 20, longitude: 30 },
    ];
    const center = getCenter(stores);
    expect(center.lat).toBeCloseTo(15, 2);
    expect(center.lng).toBeCloseTo(25, 2);
  });
});

describe('getBounds', () => {
  it('calculates the bounds correctly', () => {
    const stores = [
      { latitude: 10, longitude: 20 },
      { latitude: 15, longitude: 25 },
      { latitude: 20, longitude: 30 },
    ];
    const bounds = getBounds(stores);
    expect(bounds.north).toBe(20.1);
    expect(bounds.south).toBe(9.9);
    expect(bounds.west).toBe(19.9);
    expect(bounds.east).toBe(30.1);
  });
});

describe('getTier', () => {
  it('returns the correct tier', () => {
    const waitingGroup = 15;
    const tier = getTier(waitingGroup);
    expect(tier).toBe(2);
  });
});

describe('getTierVariant', () => {
  it('returns the correct tier variant', () => {
    const waitingGroup = 15;
    const variant = getTierVariant(waitingGroup);
    expect(variant).toBe('tier-2');
  });
});

describe('getFlagVariant', () => {
  it('returns the correct flag variant', () => {
    const flag = true;
    const variant = getFlagVariant(flag);
    expect(variant).toBe('on');
  });
});

describe('getDisplayTime', () => {
  it('returns the correct display time', () => {
    const timestamp = 1628433753000;
    const expectedTime = '2021年8月8日(週日) 22:42:33';
    const displayTime = getDisplayTime(timestamp);
    expect(displayTime).toBe(expectedTime);
  });
});
