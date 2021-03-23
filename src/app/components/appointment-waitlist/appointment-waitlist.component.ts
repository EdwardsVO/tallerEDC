import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { VehiclesCrudService } from 'src/app/services/vehicles-crud.service';

@Component({
  selector: 'app-appointment-waitlist',
  templateUrl: './appointment-waitlist.component.html',
  styleUrls: ['./appointment-waitlist.component.scss']
})
export class AppointmentWaitlistComponent implements OnInit {
  ownerName: string;
  appointmentDate: string;
  appointmentHour: string;
  cars = [];

  constructor(private _firestore: AngularFirestore, private _crudVeh: VehiclesCrudService) { }

  ngOnInit(): void {
    this.getCarsToRepair();
  }

  getCarsToRepair(){
    this._firestore.collection('cars', ref => ref.where("needsReparation", "==", true )).snapshotChanges().subscribe(res => {
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
          owner: e.payload.doc.data().owner        
        }
      })
    })
  }

  confirmAppointment(carId: string){
    this._crudVeh.updateCarAppointmentDate(carId, this.appointmentDate)
    this._crudVeh.updateCarAppointmentHour(carId, this.appointmentHour)
    this._crudVeh.updateCarAppointmentStatus(carId, true);

  }



}
