import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  cars = [
    {
      img: "assets/corolla.png",
      serial: "JHLRD77875C027456",
      model: "Corolla",
      year: "2020",
      license_plate: "RAL38K"
    },
    {
      img: "assets/yaris.png",
      serial: "VIHRD19374C048203",
      model: "Yaris",
      year: "2018",
      license_plate: "RJA27C"
    },
  ]

  appointments = [
    {
      img: "assets/corolla.png",
      model: "Corolla",
      year: "2020",
      license_plate: "RAL38K",
      date: "17/04/2021"
    },
    
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
