import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-reports',
  templateUrl: './client-reports.component.html',
  styleUrls: ['./client-reports.component.scss']
})
export class ClientReportsComponent implements OnInit {
  clients =[
    {
      img: "assets/img/placeholder.jpg",
      name: "Ana Iturbe",
      phone:"414-101-3177"
    },
    {
      img: "assets/img/placeholder.jpg",
      name: "Ana Iturbe",
      phone:"414-101-3177"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
