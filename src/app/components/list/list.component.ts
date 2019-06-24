import { Component, OnInit } from '@angular/core';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  faPen = faPen;
  faTimes = faTimes;
  
  constructor() { }

  deleteClient(id: string, $event): void {
    $event.preventDefault()
    console.log("id", id);
  }

  ngOnInit() {
  }

}
