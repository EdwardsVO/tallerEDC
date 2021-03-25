import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MechanicCrudService {

  constructor(private _firestore: AngularFirestore) { }

  confirmWork(appointmentId, mechName){
    this._firestore.collection('appointments').doc(appointmentId).update({
      mechName: mechName,
    })
  }

  async updateAppointment(appointment) {
    try{
      await this._firestore.collection('appointments').doc(appointment.id).update({

        carColor: appointment.carColor,
        carKm: appointment.carKm,
        carGas: appointment.carGas,

        // CheckBox
        extraTire: appointment.extraTire,
        keys: appointment.keys  ,
        tools: appointment.tools ,
        stereo: appointment.stereo ,
        scratches: appointment.scratches ,
        gato: appointment.gato ,

        // Diagnostico
        diagnostic: appointment.diagnostic,
        repuestos: appointment.repuestos,
        procedure: appointment.procedure,

      })
    } catch(err) {
      console.log(err);
    }
  }

  async finishWork(carId) {
    try {
      await this._firestore.collection('cars').doc(carId).update({
        repaired: true,
        alertManager: false,
        needsReparation: false,
        appointmentConfirmed: false,
        appointmentDate: '',
        appointmentHour: '',
        timesRepaired: +1,
      })
    } catch(err) {
      console.log(err);
    }
  }

}
