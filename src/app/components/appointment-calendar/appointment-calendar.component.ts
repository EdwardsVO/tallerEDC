import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/angular';

import { INITIAL_EVENTS, createEventId } from './event_utils';
//import { EventInput } from '@fullcalendar/angular';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.scss']
})
export class AppointmentCalendarComponent implements OnInit {
  cars = [];
  filterCar: string;
  events: EventInput[] = [];
  date = "";
  car = '';
  

 

  


  constructor(private _firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getConfirmedCars()
    
    this.getEvents()
    
    
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
    this._firestore.collection('cars', ref => ref.where("appointmentConfirmed", "==", true )).snapshotChanges().subscribe(res => {
      this.events  = res.map((e: any) => {
        this.date = e.payload.doc.data().appointmentDate
        console.log(this.date.replace(/T.*$/, ''))
        return {
          id: createEventId(),
          title: e.payload.doc.data().brand,
          start: this.date
        }
      })
    })
  }

  

  


  
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: this.events, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }





}


