import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { VehiclesCrudService } from '../services/vehicles-crud.service';

@Component({
  selector: 'app-alert-manager',
  templateUrl: './alert-manager.component.html',
  styleUrls: ['./alert-manager.component.scss']
})
export class AlertManagerComponent implements OnInit {

  cars = [];

  constructor(private _firestore: AngularFirestore, private _vehicleSvc: VehiclesCrudService) { }

  ngOnInit(): void {
  }

  getAlerts(){
    this._firestore.collection('cars', ref => ref.where("alertManager", "==", true )).snapshotChanges().subscribe(res => {
      this.cars = res.map((e: any) => {
        return {
          id: e.payload.doc.id,
          serial: e.payload.doc.data().serial,
          brand: e.payload.doc.data().marca,
          model: e.payload.doc.data().modelo,
          year: e.payload.doc.data().year,
          plate: e.payload.doc.data().placa,
          reparation: e.payload.doc.data().needsReparation,
          appointmentDate: e.payload.doc.data().appointmentDate,
          appointmentHour: e.payload.doc.data().appointmentHour,
          appointmentConfirmed: e.payload.doc.data().appointmentConfirmed,
          owner: e.payload.doc.data().owner,
          alertManager: e.payload.doc.data().alertManager
        }
      })
    })
  }



}
