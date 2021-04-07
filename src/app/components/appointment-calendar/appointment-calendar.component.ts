import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CalendarOptions } from '@fullcalendar/angular';
import { formatDate } from '@fullcalendar/core';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.scss']
})
export class AppointmentCalendarComponent implements OnInit {
  cars = [];
  filterCar: string;
  events = [];
  date = "";
  car = '';

 

  // handleDateClick(arg) {
  //   alert('date click! ' + arg.dateStr)
  // }


  constructor(private _firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getConfirmedCars()
  }
  getConfirmedCars(){
    this._firestore.collection('cars', ref => ref.where("appointmentConfirmed", "==", true )).snapshotChanges().subscribe(res => {
      this.cars = res.map((e: any) => {
        return {
          id: e.payload.doc.id,
          serial: e.payload.doc.data().serial,
          brand: e.payload.doc.data().brand,
          model: e.payload.doc.data().model,
          year: e.payload.doc.data().year,
          plate: e.payload.doc.data().plate,
          reparation: e.payload.doc.data().needsReparation,
          appointmentDate: e.payload.doc.data().appointmentDate,
          appointmentHour: e.payload.doc.data().appointmentHour,
          appointmentConfirmed: e.payload.doc.data().appointmentConfirmed,
          owner: e.payload.doc.data().owner,
          ownerName: e.payload.doc.data().ownerName,
          photo: e.payload.doc.data().photo
        }
      })
    })
  }

  getEvents(){
    this._firestore.collection('cars', ref => ref.where("appointmentConfirmed", "==", true )).snapshotChanges().subscribe(
      res => {
        res.map((e: any) => {
        //for(let r of res) {
          const date = new Date(e.dateStart)
          const simpleDate = date.toISOString().split('T')[0]
          this.events.push({title: e.payload.doc.data().ownerName, date: simpleDate})
        })
      })

  }

  

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    
    //dateClick: this.handleDateClick.bind(this), // bind is important!
    events: this.events
    //[
    //   { title: this.car , date: '2021-04-02' },
    //   // { title: 'event 2', date: '2021-04-02' }
    // ]
  };
}


