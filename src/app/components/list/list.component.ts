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
  faPen = faPen;
  faTimes = faTimes;

  public clients: Client[];
  
  constructor(
    private storageService: StorageService,
  ) { }

  deleteClient(id: string, $event): void {
    $event.preventDefault()
    console.log("id", id);
  }

  ngOnInit() {
    this.storageService.getClients()
    .subscribe(data => this.clients = data)
  }

}
