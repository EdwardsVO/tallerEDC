import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-appointments-manager',
  templateUrl: './appointments-manager.component.html',
  styleUrls: ['./appointments-manager.component.scss']
})
export class AppointmentsManagerComponent implements OnInit {
  carsAppointment: Observable<any[]>

  constructor() { }

  ngOnInit(): void {
  }

  getCarsAppointmets(listCarAppointment){
    this.carsAppointment = listCarAppointment;
  }
}
