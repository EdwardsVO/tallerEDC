import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.component.html',
  styleUrls: ['./codigo-qr.component.scss']
})
export class CodigoQRComponent implements OnInit {

  value = ''
  constructor() { }

  ngOnInit(): void {
  }

  setQRData(appointmentId){
    console.log(appointmentId);
    this.value = appointmentId;
    console.log(this.value);
    return this.value
  }

}
