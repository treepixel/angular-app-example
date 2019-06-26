import {BehaviorSubject, Observable} from 'rxjs';

export default class MockApiService {
  brands = [
    {nome:"GM - Chevrolet", codigo: "01"},
    {nome:"Fiat", codigo: "02"},
  ];

  models = [
    {nome:"Carro 1", codigo: "01"},
    {nome:"Carro 2", codigo: "02"},
  ];

  getVehiclesBrands(): Observable<any[]> {
    return new BehaviorSubject(this.brands);
  }

  getVehiclesModels(): Observable<any[]> {
    return new BehaviorSubject(this.models);
  }
}