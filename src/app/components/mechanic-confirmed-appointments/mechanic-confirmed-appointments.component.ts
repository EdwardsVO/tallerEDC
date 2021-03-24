import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(private firestore: AngularFirestore, private _authSvc: AuthService, private _mechSvc: MechanicCrudService) { }

  ngOnInit(): void {


  this.firestore.collection('users').doc(localStorage.getItem('user')).snapshotChanges().subscribe(res => {
    this.mechanicName = res.payload.get('name');
    this.mechanicId = res.payload.get('id');

    this.firestore.collection('appointments', ref => ref.where("mechName", "==", this.mechanicName)).snapshotChanges().subscribe(res => {
      this.appointments = res.map((e: any) => {
        return {
          // Appointment document ID
          id: e.payload.doc.id,
          brand: e.payload.doc.data().carBrand,
          model: e.payload.doc.data().carModel,
          plate: e.payload.doc.data().carPlate,
        }
      })
    })
  })

}

  scanQR() {
    console.log("aqui se abre el escaner y toma foto del QR del cliente.");
  }

  rejectWork(appointmentId) {
    this._mechSvc.confirmWork(appointmentId, '');
    console.log(this.appointments.length);
  }

}

