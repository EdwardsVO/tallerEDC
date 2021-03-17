import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  cars = [
    {
      img: "assets/corolla.png",
      serial: "JHLRD77875C027456",
      model: "Corolla",
      year: "2020",
      license_plate: "RAL38K",
      time: "8:15am",
      order1: "reproductor",
      order2:"vidrio derecho"
    },
    {
      img: "assets/yaris.png",
      serial: "VIHRD19374C048203",
      model: "Yaris",
      year: "2018",
      license_plate: "RJA27C",
      time: "7:15am",
      order1: "reproductor",
      order2:"vidrio derecho"
    },
    {
      img: "assets/yaris.png",
      serial: "VIHRD19374C048203",
      model: "Yaris",
      year: "2018",
      license_plate: "RJA27C",
      time: "9:25am",
      order1: "reproductor",
      order2:"vidrio derecho"
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
