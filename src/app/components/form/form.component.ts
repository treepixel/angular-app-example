import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
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
  
  private form: FormGroup;
  private brands: VehicleBrand[];
  private vehicles: VehicleModel[];
  private client: Client;
  private modeEdition: string;
  private clientId: string;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder, 
    private apiService: ApiService, 
    private storageService: StorageService,
    private validateBrService: ValidateBrService
  ) { }

  ngOnInit() {

    //Build the form and settings validators
    this.form = this.formBuilder.group({
      'name': [null, [ Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(120) ]],
      'cpf': [null, [ Validators.required, 
        this.validateBrService.cpf ]],
      'phone': [null, [Validators.required]],
      'birthday': [null, [ Validators.required ]],
      'brand': [null, [ Validators.required ]],
      'vehicle': [null, [ Validators.required ]],
    });

    //Get de brands of vehicle and populate combobox
    this.apiService.getVehiclesBrands()
    .subscribe(data => this.brands = data)

    //Populate vehicle combobox based on brand selected
    this.form.get('brand').valueChanges
      .pipe(
        switchMap(value => this.apiService.getVehiclesModels(value.codigo))
      )
      .subscribe(data => this.vehicles = data);


    //Check if is edition or new Client
    this.route.params.subscribe((params: Params) => {
      if(params.id){
        this.modeEdition = 'edit';
        this.clientId = params.id;
        this.client = this.storageService.getClient(params.id);
        this.form.patchValue(this.client);
      }
    });
  }

  //Submit form weather new client or edit client
  submit() {   
    if(this.modeEdition == 'edit'){
      this.storageService.editClient(
        this.mapDataToClient(this.form.value), 
        this.clientId
      )
    } else {
      this.storageService.addClient(
        this.mapDataToClient(this.form.value)
      );
    }
    this.router.navigate(['']);
  } 
  
  //function to compare objects to set combobox in case of edition
  check(obj1, obj2) {
    return obj1 && obj2 
      ? (obj1.codigo === obj2.codigo && obj1.nome === obj2.nome) 
      : obj1 === obj2;
  }

  //function to treat data from form.value and creates a new Client object
  mapDataToClient(data: any): Client {
    return new Client(
      data.name,
      data.cpf,
      data.phone,
      data.birthday,
      data.brand,
      data.vehicle
    )
  }
}
