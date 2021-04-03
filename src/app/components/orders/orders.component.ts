import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { VehiclesCrudService } from '../../services/vehicles-crud.service';
import { Appointment } from 'src/app/models/appointment'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  closeResult = '';
  priceValue: FormGroup;



  cars = [];
  appointmentInfo: Appointment[];
  totalPrice = ""

  constructor( private modalService: NgbModal, private _vehicleSvc: VehiclesCrudService, private _firestore: AngularFirestore, private _form: FormBuilder) { }

  ngOnInit(): void {
    this.priceValue = this._form.group({
      totalPrice: ["", Validators.required]
    })
    this.getConfirmedAppointments();
    this.getAppointmentInfo();
  }

  // GET ALL THE CARS WHICH APPOINTMENTS ARE DONE

  getConfirmedAppointments() {
    this._firestore.collection('cars', ref => ref.where("repaired", "==", true)).snapshotChanges().subscribe(res => {
      this.cars = res.map((e: any) => {
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
          alertManager: e.payload.doc.data().alertManager,
          lastAppointment: e.payload.doc.data().lastAppointment,
        }
      })
    })
  }

  // GET ALL THE INFORMATION ABOUT THE APPOINTMENTS AND REPARATIONS.

  getAppointmentInfo(){
    this._firestore.collection('appointments', ref => ref.where("repaired", "==", true)).snapshotChanges().subscribe(res => {
      this.appointmentInfo = res.map((e: any) => {
        return {
          appointmentId: e.payload.doc.id,
          appointmentDate: e.payload.doc.data().appointmentDate,
          reason: e.payload.doc.data().reason,
          carID: e.payload.doc.data().carId ,
          carBrand: e.payload.doc.data().carBrand,
          carModel: e.payload.doc.data().carModel,
          carPlate: e.payload.doc.data().carPlate,
          carYear: e.payload.doc.data().carYear,
          carColor: e.payload.doc.data().carColor,
          carKm: e.payload.doc.data().carKm,
          carGas: e.payload.doc.data().carGas,
          extraTire: e.payload.doc.data().extraTire,
          keys: e.payload.doc.data().keys,
          tools: e.payload.doc.data().tools,
          stereo: e.payload.doc.data().stereo,
          scratches: e.payload.doc.data().scratches,
          mechName: e.payload.doc.data().mechName,
          repairs: e.payload.doc.data().repairs,
          totalPriceService: e.payload.doc.data().totalPriceService,
          diagnostic: e.payload.doc.data().diagnostic,
          procedure: e.payload.doc.data().procedure,
          repuestos: e.payload.doc.data().repuestos,
        }
      })
    })
  }



  closeOrder(carId, aID){
    this.totalPrice = this.priceValue.get("totalPrice").value
    this._vehicleSvc.closeAppointments(carId, aID, this.totalPrice);
    this.priceValue.reset();
    this.modalService.dismissAll();
    // this.totalPrice = "";
  }



  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  // getLastAppointment(id){
  //   console.log(object);
  // }

}
