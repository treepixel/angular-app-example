import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import { Client } from '../models/client'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  readonly STORAGE_KEY = '@register_app:storage'

  getClients(): Observable<Client[]> {
    return new BehaviorSubject(this.getFromStorage());
  }

  addClient(client: Client): void {
    let clients: Client[] = this.getFromStorage();
    clients.push(client);
    this.saveOnStorage(clients);
  }

  getClient(id: string): Client {
    let clients : Client[] = this.getFromStorage();
    return clients.find(client => client.id === id);
  }

  editClient(client: Client, id: string): void {
    let clients: Client[] = this.getFromStorage();
    let clientsUpdated: Client[] = [
      ...clients.filter(client => client.id !== id),
      {
        ...clients.find(client => client.id == id),
        name: client.name,
        cpf: client.cpf,
        phone: client.phone,
        birthday: client.birthday,
        brand: client.brand,
        vehicle: client.vehicle
      }
    ];
    this.saveOnStorage(clientsUpdated);
  }

  removeClient(id: string): void {
    let clients : Client[] = this.getFromStorage()
    this.saveOnStorage(clients.filter(client => client.id !== id))
  }

  getFromStorage(): Client[] {
    let localStorageItem = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    return localStorageItem == null ? [] : localStorageItem.clients;
  }

  saveOnStorage(clients: Client[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ clients }));
  }
}
