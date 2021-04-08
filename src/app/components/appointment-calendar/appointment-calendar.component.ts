import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DateSelectArg, EventClickArg, EventApi, EventInput, CalendarOptions, Calendar } from '@fullcalendar/angular';
import { Event } from '../../models/event';

import { INITIAL_EVENTS, createEventId } from './event_utils';
//import { EventInput } from '@fullcalendar/angular';
import {EventCrudService} from '../../services/event-crud.service'

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
  calendarVisible: boolean;
  calendarOptions: CalendarOptions;
  //IEVENTS: EventInput[] = [];
  id: string;
  title: string;
  event: Event;
  calendar: Calendar;
  calendarEL = document.getElementById('calendar')
  

  

 

  


  constructor(private _firestore: AngularFirestore, private _eventservice: EventCrudService) { }

  ngOnInit(): void {
    // this.getConfirmedCars()

    // this.calendar = new Calendar(this.calendarEL, {
    //   headerToolbar: {
    //     left: 'prev,next today',
    //     center: 'title',
    //     right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    //   },
    //   initialView: 'dayGridMonth',
    //   events: this.events,
    //   //initialEvents: this.events, // alternatively, use the `events` setting to fetch from a feed
    //   weekends: true,
    //   editable: true,
    //   selectable: true,
    //   selectMirror: true,
    //   dayMaxEvents: true,
    //   //select: this.handleDateSelect.bind(this),
    //   //eventClick: this.handleEventClick.bind(this),
    //   //eventsSet: this.handleEvents.bind(this)

    // })
    
    //this.getEvents()

    //this.fillCalendar()

    
    
    //setTimeout(() =>
      
    this.showEvents()
    //, 3000);
    
    
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
      res.map((e: any) => {
        this.id = createEventId()
        this.title = e.payload.doc.data().brand
        this.date = e.payload.doc.data().appointmentDate
        this._eventservice.newEvent(
          this.id,
          this.title,
          this.date

        )
        
      })
    })
    console.log(this.events)
    this.getEvents2()
    
  }

  

  getEvents2(){
    this._firestore.collection('events').snapshotChanges().subscribe(res => {
      this.events = res.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          title: e.payload.doc.data().title,
          start: e.payload.doc.data().start
        }
      })
    })
    console.log(this.calendar)
    this.events.forEach(event =>{
      
      this.calendar.addEvent({
        title: event.title,
        start: event.start
      })
    })
    console.log(this.events)
    this.calendar.render()

  }

 

  fillCalendar(){
    this.events = [
      {id: 'calendar',
      title: 'hola',
      start: new Date().toISOString().replace(/T.*$/, '')
    }]

    console.log(this.events)

    this.events.forEach(event =>{
      console.log(event.title)
      this.calendar.addEvent({
        id: event.id,
        title: event.title,
        start: event.start
      })
    })
    console.log(this.calendar)
    this.calendar.render()

  }
  

  

  // IEVENTS: EventInput[] = [
  //   {
  //     id: createEventId(),
  //     title: 'hola',
  //     start: new Date().toISOString().replace(/T.*$/, '')
  //   }
  // ];

  


  showEvents(){
    console.log(this.events)
   
    try{
      this.calendarVisible = true
      this.calendarOptions = {
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

    }catch(error){
      console.log(error)
    }
    
    

  }
  
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


