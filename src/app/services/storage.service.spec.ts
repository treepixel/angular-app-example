import { TestBed } from '@angular/core/testing';

import { Client } from '../models/client';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let mockClients: Client[] = [
    new Client(
      "Antonio", 
      "362.734.434-08",
      "(47) 99999-9999",
      new Date(),
      {nome: "Fiat", codigo: "1"},
      {nome: "Uno Mile", codigo: "05"}
    )
  ];
  let mockClient: Client = new Client(
    "Antonio Rodrigo", 
    "517.624.547-77",
    "(47) 99999-9999",
    new Date(),
    {nome: "Ford", codigo: "5"},
    {nome: "Fusion", codigo: "10"}
  );

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
        store[key] = value;
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
      service.saveOnStorage(mockClients);
      let objectStore: any = JSON.parse(localStorage.getItem(service.STORAGE_KEY))
      expect(objectStore.clients.length).toBeGreaterThanOrEqual(1);
  });

  it('should get clients from localStorage',
    () => {
      localStorage.setItem(service.STORAGE_KEY, JSON.stringify({ clients: mockClients }));
      let objectStore: any = service.getFromStorage()
      expect(objectStore.length).toBeGreaterThanOrEqual(1);
  });

  it('should add new client in localStorage',
    () => {
      localStorage.setItem(service.STORAGE_KEY, JSON.stringify({ clients: mockClients }));
      
      service.addClient(mockClient);

      let objectStore: any = JSON.parse(localStorage.getItem(service.STORAGE_KEY));
      expect(objectStore.clients.length).toBeGreaterThanOrEqual(2);
  });
  
  it('should get client by id from localStorage',
    () => {
      localStorage.setItem(service.STORAGE_KEY, JSON.stringify({ clients: mockClients }));
      
      let clientId: string = mockClients[0].id;
      let client: Client = service.getClient(clientId);

      expect(client.name).toBe("Antonio");
  });

  it('should update client by id from localStorage',
    () => {
      localStorage.setItem(service.STORAGE_KEY, JSON.stringify({ clients: mockClients }));

      let clientId: string = mockClients[0].id;
      let updateClient: Client = mockClient;
      updateClient.id = clientId;

      service.editClient(updateClient, clientId);

      let objectStore: any = JSON.parse(localStorage.getItem(service.STORAGE_KEY));
      expect(objectStore.clients[0].name).toBe("Antonio Rodrigo");
  });

  it('should remove client by id from localStorage',
    () => {
      localStorage.setItem(service.STORAGE_KEY, JSON.stringify({ clients: mockClients }));
      
      let clientId: string = mockClients[0].id;
      service.removeClient(clientId);

      let objectStore: any = JSON.parse(localStorage.getItem(service.STORAGE_KEY));
      expect(objectStore.clients.length).toBe(0);
  });
});
