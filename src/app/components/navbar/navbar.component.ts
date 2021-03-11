import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toHome(){
    document.getElementById("inicio").scrollIntoView({behavior:"smooth"});
  }
  toAbout(){
    document.getElementById("about").scrollIntoView({behavior:"smooth"});

  }
  toLocation(){
    document.getElementById("location").scrollIntoView({behavior:"smooth"});

  }
  toContact(){
    document.getElementById("contact").scrollIntoView({behavior:"smooth"});

}

}
