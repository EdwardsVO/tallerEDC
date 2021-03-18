import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mechanic-reports',
  templateUrl: './mechanic-reports.component.html',
  styleUrls: ['./mechanic-reports.component.scss']
})
export class MechanicReportsComponent implements OnInit {
  mechanics =[
    {
      img: "assets/img/placeholder.jpg",
      name: "Isabella Iturbe",
      phone:"414-101-3177"
    },
    {
      img: "assets/img/placeholder.jpg",
      name: "Sebastian Marinuzzi",
      phone:"414-101-3177"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
