import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { VehiclesCrudService } from '../../services/vehicles-crud.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  closeResult = '';



  appointments = [];

  constructor( private modalService: NgbModal, private _vehicleSvc: VehiclesCrudService, private _firestore: AngularFirestore) { }

  ngOnInit(): void {

    this.getConfirmedAppointments();
  }

  // GET ALL THE CARS WHICH APPOINTMENTS WERE CONFIRMED BY THE CLIENT

  getConfirmedAppointments() {
    this._firestore.collection('cars', ref => ref.where("repaired", "==", true)).snapshotChanges().subscribe(res => {
      this.appointments = res.map((e: any) => {
        return {
          id: e.payload.doc.id,
          ownerName: e.payload.doc.data().ownerName,
          serial: e.payload.doc.data().serial,
          brand: e.payload.doc.data().brand,
          model: e.payload.doc.data().model,
          year: e.payload.doc.data().year,
          plate: e.payload.doc.data().plate,
          reparation: e.payload.doc.data().needsReparation,
          appointmentDate: e.payload.doc.data().appointmentDate,
          appointmentConfirmed: e.payload.doc.data().appointmentConfirmed,
          appointmentHour: e.payload.doc.data().appointmentHour,
          alertManager: e.payload.doc.data().alertManager
        }
      })
    })
  }

  // CLOSE APPOINTMENT THAT WAS PREVIOUSLY MARKED AS REPAIRED BY THE MECHANIC

  closeAppointment(appointmentId) {
    this._vehicleSvc.closeAppointments(appointmentId, false, '', '', false);
    // AQUI FALTA ENVIAR EL REPORTE DE REPARACION
    // .......
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
