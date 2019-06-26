import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms'
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormComponent } from './form.component';
import { ApiService } from '../../services/api.service';
import MockApiService from '../../mockTests/mockApiService'
import { StorageService } from '../../services/storage.service';
import MockStorageService from '../../mockTests/mockStorageService'
import MockSorageService from '../../mockTests/mockStorageService';

describe('FormComponent', () => {
  let component: FormComponent;
  let storageService: StorageService;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot()
      ],
      declarations: [ 
        FormComponent 
      ],
      providers: [
        {provide: ApiService, useClass: MockApiService},
        {provide: StorageService, useClass: MockStorageService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    storageService = TestBed.get(StorageService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should brands.length = 2 after Angular calls ngOnInit', () => {
    component.ngOnInit();
    expect(component.brands.length).toBeGreaterThanOrEqual(2);
  });

  it('should add new client on submit form', () => {
    component.form.patchValue({
      nome: "Elídia Rafaela Ventura",
      cpf: "44173238959",
      phone: "6599999999",
      birthday: "2005-11-11",
      brand: {nome: "Fiat", codigo: "01"},
      vehicle: {nome: "Toro", codigo: "01"}
    }); 

    component.submit();

    let clients: any;
    storageService.getClients().subscribe(data => clients = data);

    expect(clients.length).toBe(3);
  });

  it('should function "check" copares if two objects are equal', () => {
    
    let obj1 = {nome: "Antonio", codigo: "01"};
    let obj2 = {nome: "Antonio", codigo: "01"};
    let obj3 = {nome: "Rodrigo", codigo: "02"};
    
    expect(component.check(obj1, obj2)).toBe(true);
    expect(component.check(obj1, obj3)).toBe(false);
  });
});
