import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleBrand } from '../models/vehicle-brand'
import { VehicleModel} from '../models/vehicle-model'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  readonly API_URL = 'https://parallelum.com.br/fipe/api/v1/carros';

  getVehiclesBrands(): Observable<VehicleBrand[]> {
    return this.http.get<VehicleBrand[]>(`${this.API_URL}/marcas`)
  }
  
  getVehiclesModels(code: string): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(`${this.API_URL}/marcas/${code}/modelos`)
  }
}
