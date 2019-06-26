import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule } from 'ngx-mask';

import { ListComponent } from './list.component';
import { StorageService } from 'src/app/services/storage.service';
import MockSorageService from '../../mockTests/mockStorageService';


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
        NgxMaskModule.forRoot()
      ],
      declarations: [ ListComponent ],
      providers: [{provide: StorageService, useClass: MockSorageService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clients.length = 2 after Angular calls ngOnInit', () => {
    component.ngOnInit();
    expect(component.clients.length).toBeGreaterThanOrEqual(2);
  });

  it('should clients.length = 1 after click deleteClient event', () => {

    let $event = {
      preventDefault: () => {}
    }

    component.deleteClient('asdf5545asd98123', $event);
    expect(component.clients.length).toBe(1);
  });
});
