import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators';

import { faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  private currentRoute: string;
  public faList = faList;

  constructor(private router: Router) {
    
    /*
     * Observing the current route to change the 
     * button of header
     */
    this.router.events.pipe(
      filter(ev => (ev instanceof NavigationEnd))
    ).subscribe((ev: NavigationEnd) => {
      this.currentRoute = ev.url;
    });
  }

  ngOnInit() {
  }

}
