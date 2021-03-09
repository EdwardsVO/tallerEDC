import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-status',
  templateUrl: './profile-status.component.html',
  styleUrls: ['./profile-status.component.scss']
})
export class ProfileStatusComponent implements OnInit {

  cars = [
    {
      img: "assets/corolla.png",
      serial: "JHLRD77875C027456",
      model: "Corolla",
      year: "2020",
      license_plate: "RAL38K"
    },
  
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
