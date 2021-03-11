import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

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
      model: "Yaris",
      year: "2020",
      license_plate: "RAL38K"
    },

 
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
