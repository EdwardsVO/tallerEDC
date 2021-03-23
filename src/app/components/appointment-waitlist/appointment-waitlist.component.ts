import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-appointment-waitlist',
  templateUrl: './appointment-waitlist.component.html',
  styleUrls: ['./appointment-waitlist.component.scss']
})
export class AppointmentWaitlistComponent implements OnInit {
  ownerName: string;
  cars = [];

  constructor(private _firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getCarsToRepair();
  }

  getCarsToRepair(){
    this._firestore.collection('cars', ref => ref.where("needsReparation", "==", true )).snapshotChanges().subscribe(res => {
      this.cars = res.map((e: any) => {
        return {
          id: e.payload.doc.id,
          serial: e.payload.doc.data().serial,
          marca: e.payload.doc.data().marca,
          modelo: e.payload.doc.data().modelo,
          year: e.payload.doc.data().year,
          placa: e.payload.doc.data().placa,
          reparation: e.payload.doc.data().needsReparation,
          owner: e.payload.doc.data().owner        
        }
        
      })
    })
  }

  confirmAppointment(){
    console.log('mamawebo')
  }



}
