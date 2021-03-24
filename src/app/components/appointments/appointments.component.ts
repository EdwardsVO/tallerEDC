import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { VehiclesCrudService } from '../../services/vehicles-crud.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';



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



  constructor(private _firestore: AngularFirestore, private _vehicleSvc: VehiclesCrudService, private _authSvc: AuthService) { }

  ngOnInit(): void {

    this.getCars();

    this.getAppointments();

  }

  // FUNCTION TO GET THE CARS THAT BELONG TO THE CURRENT USER

  getCars() {

    this._firestore.collection('cars', ref => ref.where("owner", "==", localStorage.getItem('user'))).snapshotChanges().subscribe(res => {
      this.cars = res.map((e: any) => {
        return {
          id: e.payload.doc.id,
          serial: e.payload.doc.data().serial,
          brand: e.payload.doc.data().brand,
          model: e.payload.doc.data().model,
          year: e.payload.doc.data().year,
          plate: e.payload.doc.data().plate,
          reparation: e.payload.doc.data().needsReparation,
        }
      })
    })
  }

  // FUNCTION TO MAKE AN APPOINTMENT. SETS "needsReparation" ATTRIBUTE TO TRUE IN THE DATABASE

    makeAppointment(carId: string) {
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
    }

    confirmAppointment(appointmentId) {
      this._vehicleSvc.appointmentConfirmed(appointmentId, true);
    }

    //FUNCTION MADE TO CREATE NEW APPOINTMENT IN FIREBASE APOINMENTS COLLECTION 
    newAppointment(carBrand, carModel, carPlate, carId){
      this.confirmAppointment(carId);
      this._vehicleSvc.newAppointment("", carBrand, carModel, carPlate, "", "", "");
    }

// FUNCTION TO GET ALL APPOINTMENT FROM THE DATABASE

    getAppointments() {

      this.userId = localStorage.getItem('user');
      this._firestore.collection('cars', ref => ref.where("owner", "==", this.userId)).snapshotChanges().subscribe(res => {
            this.appointments = res.map((e: any) => {
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
                alertManager: e.payload.doc.data().alertManager
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
}

