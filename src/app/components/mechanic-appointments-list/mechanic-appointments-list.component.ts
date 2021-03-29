import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { MechanicCrudService } from '../../services/mechanic-crud.service';
import {ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-mechanic-appointments-list',
  templateUrl: './mechanic-appointments-list.component.html',
  styleUrls: ['./mechanic-appointments-list.component.scss']
})
export class MechanicAppointmentsListComponent implements OnInit {

  appointments = []
  mechanicName: string;
  mechanicId: string

   
    constructor(private firestore: AngularFirestore, private _authSvc: AuthService, private _mechSvc: MechanicCrudService, private toastr: ToastrService ) { }

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
          year: e.payload.doc.data().carYear,
          plate: e.payload.doc.data().carPlate,
        }
      })
    })
  }

  showSucces(message,title){
    this.toastr.success('message','LISTO');
   }

  confirmWork(appointmentId) {
    this._mechSvc.confirmWork(appointmentId, this.mechanicName)
    this.toastr.success('Cita confirmada','LISTO');
    console.log(`Cita: ${appointmentId} ha sido asignada a ${this.mechanicName}! A chambear`);
  }

  scanQR() {
    console.log("aqui se abre el escaner y toma foto del QR del cliente.");
  }


}
