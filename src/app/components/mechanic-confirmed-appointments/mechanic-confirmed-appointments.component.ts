import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { Appointment } from 'src/app/models/appointment';
import { AuthService } from 'src/app/services/auth.service';
import { VehiclesCrudService } from 'src/app/services/vehicles-crud.service';
import { MechanicCrudService } from '../../services/mechanic-crud.service';

@Component({
  selector: 'app-mechanic-confirmed-appointments',
  templateUrl: './mechanic-confirmed-appointments.component.html',
  styleUrls: ['./mechanic-confirmed-appointments.component.scss']
})
export class MechanicConfirmedAppointmentsComponent implements OnInit {

  mechanicName: string;
  mechanicId: string;
  appointments = [];
  editState: boolean = false;
  editInfo: boolean = false;
  carToEdit: Appointment;
  extraTire: boolean = false;
  keys: boolean= false;
  gato: boolean= false;
  stereo: boolean= false;
  tools: boolean= false;
  scratches: boolean= false;


  constructor(private firestore: AngularFirestore, private _authSvc: AuthService, private _mechSvc: MechanicCrudService, private _vehicleSvc: VehiclesCrudService) { }

  ngOnInit(): void {

    

  this.firestore.collection('users').doc(localStorage.getItem('user')).snapshotChanges().subscribe(res => {
    this.mechanicName = res.payload.get('name');
    this.mechanicId = res.payload.get('id');

    this.firestore.collection('appointments', ref => ref.where("mechName", "==", this.mechanicName)).snapshotChanges().subscribe(res => {
      this.appointments = res.map((e: any) => {
        return {

          // Appointment document ID
          id: e.payload.doc.id,
          carId: e.payload.doc.data().carId,
          brand: e.payload.doc.data().carBrand,
          model: e.payload.doc.data().carModel,
          plate: e.payload.doc.data().carPlate,
          year: e.payload.doc.data().carYear,
          repaired: e.payload.doc.data().repaired,
          
        }
      })
    })
  })

}

  rejectWork(appointmentId) {
    this._mechSvc.confirmWork(appointmentId, '');
    console.log(this.appointments.length);
  }

  addCarInfo(appointment){
    this.editState = true;
    this.carToEdit = appointment;
  }

  clearState() {
    this.editState = false;
    this.carToEdit = null;
  }

  updateAppointment(appointment) {
    this._mechSvc.updateAppointment(appointment);
    this.clearState();
  }

  print(e, checkbox) {

    if(e.target.checked) {
      checkbox = true

    } else {
      checkbox = false;

    }
  }

  finishWork(carId){
    this._mechSvc.finishWork(carId)
  }

  finishWork2(appointmentId) {
    this.firestore.collection('appointments').doc(appointmentId).update({
      repaired: true,
      mechName: this.mechanicName
    })
  }


}

