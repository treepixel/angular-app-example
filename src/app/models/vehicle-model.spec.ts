import { VehicleModel } from './vehicle-model';

describe('VehicleModel', () => {
  it('should create an instance', () => {
    expect(new VehicleModel("teste", "1")).toBeTruthy();
  });
});
