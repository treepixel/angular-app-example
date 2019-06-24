import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { ValidateBrService } from 'angular-validate-br';

import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { VehicleBrand } from 'src/app/models/vehicle-brand';
import { VehicleModel } from 'src/app/models/vehicle-model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {
  
  public form: FormGroup;
  public brands: VehicleBrand[];
  public vehicles: VehicleModel[];
  
  constructor(
    private formBuilder: FormBuilder, 
    private apiService: ApiService, 
    private storageService: StorageService,
    private validateBrService: ValidateBrService
  ) { }

  ngOnInit() {
    this.apiService.getVehiclesBrands()
    .subscribe(data => this.brands = data)

    this.form = this.formBuilder.group({
      'name': [null, [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]],
      'cpf': [null, [ Validators.required, this.validateBrService.cpf ]],
      'phone': [null, [Validators.required]],
      'birthday': [null, [ Validators.required ]],
      'brand': [null, [ Validators.required ]],
      'vehicle': [null, [ Validators.required ]],
    });

    this.form.get('brand').valueChanges
      .pipe(
        switchMap(value => this.apiService.getVehiclesModels(value.codigo))
      )
      .subscribe(data => this.vehicles = data);
  }
}
