import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { VehiclesCrudService } from '../../services/vehicles-crud.service';



@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {


  cars = [];
  appointments = [];
  carChecked = false;
  carsCheckedList = [];
  carId: string;
  userId: string;
  carsData: [];

  data: any;



  constructor(private _firestore: AngularFirestore, private _vehicleSvc: VehiclesCrudService, private _authSvc: AuthService) { }

  ngOnInit(): void {

    this.getCars();

    this.getAppointments();

  }

  getCars() {

    this._firestore.collection('cars', ref => ref.where("owner", "==", localStorage.getItem('user'))).snapshotChanges().subscribe(res => {
      this.cars = res.map((e: any) => {
        return {
          id: e.payload.doc.id,
          serial: e.payload.doc.data().serial,
          marca: e.payload.doc.data().marca,
          modelo: e.payload.doc.data().modelo,
          year: e.payload.doc.data().year,
          placa: e.payload.doc.data().placa,
          reparation: e.payload.doc.data().needsReparation,
        }
      })
    })
  }

  makeAppointment(carId: string) {

    this._vehicleSvc.updateCarStatus(carId, true)
    }

    cancelAppointment(carId) {
        this._vehicleSvc.updateCarStatus(carId, false);
    }

    getAppointments() {

           this.userId = localStorage.getItem('user');
          this._firestore.collection('cars', ref => ref.where("owner", "==", this.userId)).snapshotChanges().subscribe(res => {
            this.appointments = res.map((e: any) => {
              return {
                id: e.payload.doc.id,
                serial: e.payload.doc.data().serial,
                brand: e.payload.doc.data().marca,
                model: e.payload.doc.data().modelo,
                year: e.payload.doc.data().year,
                plate: e.payload.doc.data().placa,
                reparation: e.payload.doc.data().needsReparation
              }
            })
          })
        }
}

