import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { MechanicCrudService } from '../../services/mechanic-crud.service';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-mechanic-appointments-list',
  templateUrl: './mechanic-appointments-list.component.html',
  styleUrls: ['./mechanic-appointments-list.component.scss']
})
export class MechanicAppointmentsListComponent implements OnInit {

  appointments = []
  mechanicName: string;
  mechanicId: string
  todaysDate = ""
  closeResult: string;

   
    constructor(private firestore: AngularFirestore, private _authSvc: AuthService, private _mechSvc: MechanicCrudService, private toastr: ToastrService, private _router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.getTodaysDate()

    this.firestore.collection('users').doc(localStorage.getItem('user')).snapshotChanges().subscribe(res => {
      this.mechanicName = res.payload.get('name');
      this.mechanicId = res.payload.get('id');
    })

    this.getTodaysDate()

    this.firestore.collection('appointments', ref => ref.where("mechName", "==", "").where("appointmentDate", "==", this.todaysDate)).snapshotChanges().subscribe(res => {
      this.appointments = res.map((e: any) => {
        return {
          // Appointment document ID
          id: e.payload.doc.id,
          brand: e.payload.doc.data().carBrand,
          model: e.payload.doc.data().carModel,
          year: e.payload.doc.data().carYear,
          plate: e.payload.doc.data().carPlate,
          needsReparation: e.payload.doc.data().needsReparation
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
    this._router.navigate(['/scan'])
  }

  getTodaysDate(){
    let date = new Date().toDateString();
    this.todaysDate = date
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
