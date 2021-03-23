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

    this.getAppointments();

        // this.userId = localStorage.getItem('user');
        // this._firestore.collection('cars', ref => ref.where("owner", "==", this.userId)).snapshotChanges().subscribe(res => {
        //   this.appointments = res.map((e: any) => {
        //     return {
        //       id: e.payload.doc.id,
        //       serial: e.payload.doc.data().serial,
        //       brand: e.payload.doc.data().marca,
        //       model: e.payload.doc.data().modelo,
        //       year: e.payload.doc.data().year,
        //       plate: e.payload.doc.data().placa,
        //       reparation: e.payload.doc.data().needsReparation
        //     }
        //   })
        // })


  }

  onCheckBoxChange(e, carId: string) {

    this.carChecked = e.target.checked;

    if (this.carChecked === true){
      this.carsCheckedList.push(carId)

    } else if(this.carChecked === false) {

      for(let i = 0; this.carsCheckedList.length; i++){
        if(this.carsCheckedList[i] === carId){
          this.carsCheckedList.splice(i,1);
          break;
        }
      }
    }
  }

  makeAppointment() {

    for(let i = 0; this.carsCheckedList.length; i++) {
          this._vehicleSvc.updateCarStatus(this.carsCheckedList[i], true);
          console.log(`Car ${this.carsCheckedList[i]} needsReparation status set to true.`);
          break;
      }
    }

    cancelAppointment() {
      for(let i = 0; this.carsCheckedList.length; i++) {
        this._vehicleSvc.updateCarStatus(this.carsCheckedList[i], false);
        console.log(`Car ${this.carsCheckedList[i]} needsReparation status set to false.`);
        break;
    }
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

