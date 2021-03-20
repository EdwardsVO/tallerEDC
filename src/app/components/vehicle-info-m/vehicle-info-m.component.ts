import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-vehicle-info-m',
  templateUrl: './vehicle-info-m.component.html',
  styleUrls: ['./vehicle-info-m.component.scss']
})
export class VehicleInfoMComponent implements OnInit {

  dataUploaded: boolean = false;

  cars = [
    {
      img: "assets/corolla.png",
      serial: "JHLRD77875C027456",
      model: "Corolla",
      year: "2020",
      license_plate: "RAL38K",
      time: "8:15am"
    },
    {
      img: "assets/yaris.png",
      serial: "VIHRD19374C048203",
      model: "Yaris",
      year: "2018",
      license_plate: "RJA27C",
      time: "7:15am"
    },
    {
      img: "assets/yaris.png",
      serial: "VIHRD19374C048203",
      model: "Yaris",
      year: "2018",
      license_plate: "RJA27C",
      time: "9:25am"
    },
  ]

  constructor() { }


  
  ngOnInit(): void {

    

  this.dataUploaded = true;
  }



}