import { VehicleBrand } from './vehicle-brand';

describe('VehicleBrand', () => {
  it('should create an instance', () => {
    expect(new VehicleBrand("teste", "1")).toBeTruthy();
  });
});
