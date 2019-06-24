import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { ValidateBrService } from 'angular-validate-br';

import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { VehicleBrand } from 'src/app/models/vehicle-brand';
import { VehicleModel } from 'src/app/models/vehicle-model';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {
  
  public form: FormGroup;
  public brands: VehicleBrand[];
  public vehicles: VehicleModel[];
  public client: Client;
  
  constructor(
    private route: ActivatedRoute,
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

    this.route.params.subscribe((params: Params) => {
      if(params.id){
        this.client = this.storageService.getClient(params.id);
        this.form.patchValue(this.client);
      }
    });
  }

  submit() {
    this.storageService.addClient(
      new Client(
        this.form.value.name,
        this.form.value.cpf,
        this.form.value.phone,
        this.form.value.birthday,
        this.form.value.brand,
        this.form.value.vehicle
      )
    )
  } 
  
  check(obj1, obj2) {
    return obj1 && obj2 
      ? (obj1.codigo === obj2.codigo && obj1.nome === obj2.nome) 
      : obj1 === obj2;
  }
}
