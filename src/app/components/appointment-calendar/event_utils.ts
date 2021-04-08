import { EventInput } from '@fullcalendar/angular';
import {AppointmentCalendarComponent} from './appointment-calendar.component';
import { AngularFirestore } from '@angular/fire/firestore';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today


let _firestore: AngularFirestore;
let cars = [];
let title: string;
let start: string;
let id: string;


// export class event_utils {
//     constructor(private _firestore: AngularFirestore) {}


    export const INITIAL_EVENTS: EventInput[] = [
          {
            id: createEventId(),
            title: 'All-day event',
            start: TODAY_STR
          },
          {
            id: createEventId(),
            title: 'Timed event',
            start: TODAY_STR + 'T12:00:00'
          }
        ];


    // this._firestore.collection('cars', ref => ref.where("appointmentConfirmed", "==", true )).snapshotChanges().subscribe(res => {
    //     INITIAL_EVENTS = res.map((e: any) => {
    //         // title = e.payload.doc.data().brand + e.payload.doc.data().model
    //         // start = e.payload.doc.data().appointmentDate + e.payload.doc.data().appointmentHour
    //         return {
            
    //             id: createEventId(),
    //             title: e.payload.doc.data().brand + e.payload.doc.data().model,
    //             start: e.payload.doc.data().appointmentDate + e.payload.doc.data().appointmentHour
    //         }
    //         })
        
        
    // // return {
    // //     id: e.payload.doc.id,
    // //     serial: e.payload.doc.data().serial,
    // //     brand: e.payload.doc.data().brand,
    // //     model: e.payload.doc.data().model,
    // //     year: e.payload.doc.data().year,
    // //     plate: e.payload.doc.data().plate,
    // //     reparation: e.payload.doc.data().needsReparation,
    // //     appointmentDate: e.payload.doc.data().appointmentDate,
    // //     appointmentHour: e.payload.doc.data().appointmentHour,
    // //     appointmentConfirmed: e.payload.doc.data().appointmentConfirmed,
    // //     owner: e.payload.doc.data().owner,
    // //     ownerName: e.payload.doc.data().ownerName,
    // //     photo: e.payload.doc.data().photo
    // //}
    // //})
    // })



    export function createEventId() {
        return String(eventGuid++);
    }
//}