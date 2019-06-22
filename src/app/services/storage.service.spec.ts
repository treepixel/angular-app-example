import { TestBed } from '@angular/core/testing';

import { Client } from '../models/client';
import { VehicleBrand } from '../models/vehicle-brand'
import { VehicleModel } from '../models/vehicle-model'


import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let clients: Client[] = [
    new Client(
      "Antonio", 
      "720.748.171-34",
      "(47) 99999-9999",
      new Date(),
      new VehicleBrand("teste", "1"),
      new VehicleModel("teste asdfasd", "1")
    )
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    
    service = TestBed.get(StorageService);

    let store = {};
    
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store clients in localStorage',
    () => {
      service.saveClients(clients);
      let objectStore: any = JSON.parse(localStorage.getItem(service.STORAGE_KEY))
      expect(objectStore.clients.length).toBeGreaterThanOrEqual(1);
  });

  it('should get clients from localStorage',
    () => {
      localStorage.setItem(service.STORAGE_KEY, JSON.stringify({ clients }));
      let objectStore: any = service.getClients()
      expect(objectStore.length).toBeGreaterThanOrEqual(1);
  });
});
