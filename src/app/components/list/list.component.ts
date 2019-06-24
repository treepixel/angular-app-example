import { Component, OnInit } from '@angular/core';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

import { StorageService } from '../../services/storage.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  public faPen = faPen;
  public faTimes = faTimes;
  public clients: Client[];
  
  constructor(
    private storageService: StorageService,
  ) { }
  
  //function to delete client of localstorage
  deleteClient(id: string, $event): void {
    $event.preventDefault()
    this.clients = this.clients.filter(client => client.id !== id);
    this.storageService.removeClient(id);
  }

  ngOnInit() {
    
    //Assing this.clients with clients from localstorage
    this.storageService.getClients()
    .subscribe(data => this.clients = data)
  }

}
