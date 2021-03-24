import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { MechanicCrudService } from '../../services/mechanic-crud.service';


@Component({
  selector: 'app-mechanic-appointments-list',
  templateUrl: './mechanic-appointments-list.component.html',
  styleUrls: ['./mechanic-appointments-list.component.scss']
})
export class MechanicAppointmentsListComponent implements OnInit {

  appointments = []
  mechanicName: string;
  mechanicId: string

  constructor(private firestore: AngularFirestore, private _authSvc: AuthService, private _mechSvc: MechanicCrudService) { }

  ngOnInit(): void {

    this.firestore.collection('users').doc(localStorage.getItem('user')).snapshotChanges().subscribe(res => {
      this.mechanicName = res.payload.get('name');
      this.mechanicId = res.payload.get('id');
    })

    this.firestore.collection('appointments', ref => ref.where("mechName", "==", "")).snapshotChanges().subscribe(res => {
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
  }

  confirmWork(appointmentId) {
    this._mechSvc.confirmWork(appointmentId, this.mechanicName)
    console.log(`Cita: ${appointmentId} ha sido asignada a ${this.mechanicName}! A chambear`);
  }

  scanQR() {
    console.log("aqui se abre el escaner y toma foto del QR del cliente.");
  }


}
