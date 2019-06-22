import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService
  let httpMock: HttpTestingController;

  beforeEach(() => { 
      TestBed.configureTestingModule({
      providers: [ApiService],
      imports:[HttpClientTestingModule]
    })

    service = TestBed.get(ApiService)
    httpMock = TestBed.get(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<VehicleBrand[]>', () => {
    service.getVehiclesBrands().subscribe(brands => {
      expect(brands.length).toBeGreaterThan(1)
    });

    const req = httpMock.expectOne(`${service.API_URL}/marcas`);
    expect(req.request.method).toBe("GET");
  });

  it('should return an Observable<VehicleModel[]>', () => {
    service.getVehiclesModels('1').subscribe(models => {
      expect(models.length).toBeGreaterThan(1)
    });

    const req = httpMock.expectOne(`${service.API_URL}/marcas/1/modelos`);
    expect(req.request.method).toBe("GET");
  });
});
