import { CodigoQRComponent } from './../codigo-qr/codigo-qr.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { VehiclesCrudService } from '../../services/vehicles-crud.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafePropertyRead } from '@angular/compiler';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';




@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {



// ARRAYS TO STORE FIRESTORE DATA AND FETCH IT
  cars = [];
  appointments = [];

  carId: string;
  userId: string;
  query = [];
  closeResult = '';
  setAppointmentReason: FormGroup;
  reason = "";
  ownerEmail = "";
  ownerName = "";

  title = 'Appointment';
  elementType = 'url';
  value = "https://www.twitter.com/"
  gotData = false;

  appointmentQR = "";



  constructor(private _firestore: AngularFirestore, private _fb: FormBuilder,private _vehicleSvc: VehiclesCrudService, private _authSvc: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.getCars();

    this.getAppointments();

    this.setAppointmentReason = this._fb.group({
      reason: ['', Validators.required]
    })

  }

  // FUNCTION TO GET THE CARS THAT BELONG TO THE CURRENT USER

  getCars() {

    this._firestore.collection('cars', ref => ref.where("owner", "==", localStorage.getItem('user'))).snapshotChanges().subscribe(res => {
      this.cars = res.map((e: any) => {
        this.appointmentQR = e.payload.doc.data().lastAppointment;
        return {
          id: e.payload.doc.id,
          appointmentDate: e.payload.doc.data().appointmentDate,
          serial: e.payload.doc.data().serial,
          brand: e.payload.doc.data().brand,
          model: e.payload.doc.data().model,
          year: e.payload.doc.data().year,
          plate: e.payload.doc.data().plate,
          reparation: e.payload.doc.data().needsReparation,
          repaired: e.payload.doc.data().repaired,
          lastAppointment: e.payload.doc.data().lastAppointment,
          photo: e.payload.doc.data().photo,
        }
      })
    })
  }

  getQRCode(){
    this.value += this.appointmentQR;
    console.log(this.value);
    return this.value
  }

  // FUNCTION TO MAKE AN APPOINTMENT. SETS "needsReparation" ATTRIBUTE TO TRUE IN THE DATABASE

    makeAppointment(carId: string) {
      this.carId = carId
      this._vehicleSvc.updateCarStatus(carId, true);
      this._vehicleSvc.alertManager(carId, false);

    }

// FUNCTION TO REJECT AN APPOINTMENT. SETS "needsReparation" ATTRIBUTE TO FALSE IN THE DATABASE

    rejectAppointment(carId) {
      // this._vehicleSvc.updateCarStatus(carId, false);
      this._vehicleSvc.updateCarAppointmentDate(carId, '');
      this._vehicleSvc.updateCarAppointmentHour(carId, '');
      this._vehicleSvc.alertManager(carId, true);
      this._vehicleSvc.appointmentConfirmed(carId, false);
    }

// FUNCTION TO DELETE AN APPOINTMENT. CLEARS ALL THE APPOINTMENT ATTRIBUTES FROM THE DATABASE


    deleteAppointment(appointmentId) {
      this._vehicleSvc.updateCarStatus(appointmentId, false);
      this._vehicleSvc.updateCarAppointmentDate(appointmentId, '');
      this._vehicleSvc.updateCarAppointmentHour(appointmentId, '');
      this._vehicleSvc.alertManager(appointmentId, false);
      this._vehicleSvc.appointmentConfirmed(appointmentId, false);
      this._vehicleSvc.setAppointmentReason(appointmentId, '')
    }

    confirmAppointment(appointmentId) {
      this._vehicleSvc.appointmentConfirmed(appointmentId, true);
      // this._vehicleSvc.setLastAppointment(appointmentId);
    }

    async newAppointment(carId, appointmentDate,carBrand, carModel, carPlate, carYear){
      this.confirmAppointment(carId);
      await this._vehicleSvc.newAppointment(carId, appointmentDate, false, carBrand, carModel, carPlate, carYear, "", "", "", false, false, false, false, false, false, "", 0,0, "","","", this.reason, true);
    }

// FUNCTION TO GET ALL APPOINTMENT FROM THE DATABASE

    getAppointments() {

      this.userId = localStorage.getItem('user');
      
      this._firestore.collection('cars', ref => ref.where("owner", "==", this.userId)).snapshotChanges().subscribe(res => {
            this.appointments = res.map((e: any) => {
              this.ownerEmail = e.payload.doc.data().ownerEmail
              this.ownerName = e.payload.doc.data().ownerName
              return {
                id: e.payload.doc.id,
                serial: e.payload.doc.data().serial,
                brand: e.payload.doc.data().brand,
                model: e.payload.doc.data().model,
                year: e.payload.doc.data().year,
                plate: e.payload.doc.data().plate,
                reparation: e.payload.doc.data().needsReparation,
                appointmentDate: e.payload.doc.data().appointmentDate,
                appointmentConfirmed: e.payload.doc.data().appointmentConfirmed,
                appointmentHour: e.payload.doc.data().appointmentHour,
                ownerName: e.payload.doc.data().ownerName,
                ownerEmail: e.payload.doc.data().ownerEmail,
                alertManager: e.payload.doc.data().alertManager,
                photo: e.payload.doc.data().photo,
              }
            })
          })
        }

        public sendEmail(e: Event) {
          e.preventDefault();
          emailjs.sendForm('service_pwcf60n', 'template_gsog4jn', e.target as HTMLFormElement, 'user_WiVZBumT4YhIFxwiixzgr')
            .then((result: EmailJSResponseStatus) => {
              console.log(result.text);
            }, (error) => {
              console.log(error.text);
            });
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

        updateCarAppointmentReason(){
            this.reason = this.setAppointmentReason.get('reason').value
            this.setAppointmentReason.reset();
            this.modalService.dismissAll();
        }
}

