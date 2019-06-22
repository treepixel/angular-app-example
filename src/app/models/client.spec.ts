import { Client } from './client';
import { VehicleBrand } from './vehicle-brand';
import { VehicleModel } from './vehicle-model';

describe('Client', () => {
  it('should create an instance', () => {
    expect(
      new Client(
        "Antonio", 
        "720.748.171-34",
        "(47) 99999-9999",
        new Date(),
        new VehicleBrand("teste", "1"),
        new VehicleModel("teste asdfasd", "1")
      )
    ).toBeTruthy();
  });
});
