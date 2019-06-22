import { Injectable } from '@angular/core';

import { Client } from '../models/client'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  readonly STORAGE_KEY = '@register_app:storage'

  getClients(): Client[] {
    let localStorageItem = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    return localStorageItem == null ? [] : localStorageItem.clients;
  }

  saveClients(clients: Client[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ clients }));
  }
}
