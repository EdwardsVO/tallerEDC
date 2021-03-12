import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-vehicle',
  templateUrl: './profile-vehicle.component.html',
  styleUrls: ['./profile-vehicle.component.scss']
})
export class ProfileVehicleComponent implements OnInit {

  cars = [
    {
      img: "assets/corolla.png",
      serial: "JHLRD77875C027456",
      model: "Corolla",
      year: "2020",
      license_plate: "RAL38K"
    },
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
