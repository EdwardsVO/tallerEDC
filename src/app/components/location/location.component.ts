import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  title = 'Location'
  lat = 10.462048306718486;
  lng = -66.86389244546743;

  constructor() { }

  ngOnInit(): void {
  }

}
