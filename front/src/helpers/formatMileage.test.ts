import { formatMileage } from './formatMileage';

describe('formats milage correctly', () => {
  it('renders Distribution header', () => {
    const mileage0 = formatMileage(0);
    expect(mileage0).toBe('0 KM');

    const mileage500 = formatMileage(500);
    expect(mileage500).toBe('500 KM');

    const mileage1000 = formatMileage(1000);
    expect(mileage1000).toBe('1.000 KM');

    const mileage2000 = formatMileage(2000);
    expect(mileage2000).toBe('2.000 KM');

    const mileage10000 = formatMileage(10000);
    expect(mileage10000).toBe('10.000 KM');
  });
});
