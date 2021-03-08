import { formatPrice } from './formatPrice';

describe('formats milage correctly', () => {
  it('renders Distribution header', () => {
    const mileage0 = formatPrice(0);
    expect(mileage0).toBe('€0,-');

    const mileage500 = formatPrice(500);
    expect(mileage500).toBe('€500,-');

    const mileage1000 = formatPrice(1000);
    expect(mileage1000).toBe('€1.000,-');

    const mileage2000 = formatPrice(2000);
    expect(mileage2000).toBe('€2.000,-');

    const mileage10000 = formatPrice(10000);
    expect(mileage10000).toBe('€10.000,-');

    const mileage12345 = formatPrice(12345);
    expect(mileage12345).toBe('€12.345,-');

    const mileage101010 = formatPrice(101010);
    expect(mileage101010).toBe('€101.010,-');
  });
});
