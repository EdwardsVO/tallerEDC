import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { VehiclesCrudService } from 'src/app/services/vehicles-crud.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {CurrencyPipe } from '@angular/common'
import { Observable } from 'rxjs';



@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit {

  clients = [];
  managers = [];
  mechanics = [];
  admins = [];
  vehicles = [];
  cars = [];
  showMore = [];
  carsRepaired = [];
  appointments = [];
  appointmentsC = [];
  carAppointments = [];
  bestMech: any;
  bestCar: any;
  bestClient: any;
  showData = false;
  personalInfo = false;
  tecnicalInfo = false;
  carInfo = false;
  clientDataUp = false;
  profit = 0;
  closeResult = '';
  money = [];


  constructor(private _firestore: AngularFirestore, private _vech: VehiclesCrudService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAdmins();
    this.getClients();
    this.getManagers();
    this.getMechs();
    this.getTotalCars();
    this.getRepairedCars();
    this.getAppointmetnsCompleted();
    this.totalMoneySpent();
    // this.showDataS();
  }

  async getAppointmetnsCompleted() {
    await this._firestore.collection('appointments').snapshotChanges().subscribe(res => {
      this.appointmentsC = res.map((e: any) => {
        return {
          appointmentDate: e.payload.doc.data().appointmentDate,
          appointmentID: e.payload.doc.data().appointmentID,
          carBrand: e.payload.doc.data().carBrand,
          carColor: e.payload.doc.data().carColor,
          carGas: e.payload.doc.data().carGas,
          carModel: e.payload.doc.data().carModel,
          carPlate: e.payload.doc.data().carPlate,
          carKm: e.payload.doc.data().carKm,
          carYear: e.payload.doc.data().carYear,
          diagnostic: e.payload.doc.data().diagnostic,
          extraTire: e.payload.doc.data().extraTire,
          gato: e.payload.doc.data().gato,
          keys: e.payload.doc.data().keys,
          mechName: e.payload.doc.data().mechName,
          procedure: e.payload.doc.data().procedure,
          reason: e.payload.doc.data().reason,
          repairs: e.payload.doc.data().repairs,
          repuestos: e.payload.doc.data().repuestos,
          scratches: e.payload.doc.data().scratches,
          stereo: e.payload.doc.data().stereo,
          tools: e.payload.doc.data().tools,
          totalPriceService: e.payload.doc.data().totalPriceService,
        }
      })
      this.showDataS()
    })
  }
  async getAppointments(id) {
    await this._firestore.collection('appointments', ref => ref.where("carId", "==", id)).snapshotChanges().subscribe(res => {
      this.appointments = res.map((e: any) => {
        setTimeout(()=>{
          this.tecnicalInfo = true;
        }, 1000)
        return {
          appointmentDate: e.payload.doc.data().appointmentDate,
          appointmentID: e.payload.doc.data().appointmentID,
          carBrand: e.payload.doc.data().carBrand,
          carColor: e.payload.doc.data().carColor,
          carGas: e.payload.doc.data().carGas,
          carModel: e.payload.doc.data().carModel,
          carPlate: e.payload.doc.data().carPlate,
          carYear: e.payload.doc.data().carYear,
          diagnostic: e.payload.doc.data().diagnostic,
          extraTire: e.payload.doc.data().extraTire,
          gato: e.payload.doc.data().gato,
          keys: e.payload.doc.data().keys,
          mechName: e.payload.doc.data().mechNmae,
          procedure: e.payload.doc.data().procedure,
          reason: e.payload.doc.data().reason,
          repairs: e.payload.doc.data().repairs,
          repuestos: e.payload.doc.data().repuestos,
          scratches: e.payload.doc.data().scratches,
          stereo: e.payload.doc.data().stereo,
          tools: e.payload.doc.data().tools,
          totalPriceService: e.payload.doc.data().totalPriceService
        }
      })
    })
  }
  async getClients() {
    await this._firestore.collection('users', ref => ref.where("role", "==", "client")).snapshotChanges().subscribe(res => {
      setTimeout(() =>{
        this.clientDataUp = true;
      }, 1000)
      this.clients = res.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          name: e.payload.doc.data().name,
          email: e.payload.doc.data().email,
          phone: e.payload.doc.data().phone,
          moneySpent: e.payload.doc.data().moneySpent,
          role: e.payload.doc.data().role,
          carsRepaired: e.payload.doc.data().carsRepaired,
          photo: e.payload.doc.data().photo,
          age: e.payload.doc.data().age,
          gender: e.payload.doc.data().gender,
          date: e.payload.doc.data().date,
        }
      })
    })
  }
  async getManagers() {
    await this._firestore.collection('users', ref => ref.where("role", "==", "manager")).snapshotChanges().subscribe(res => {
      this.managers = res.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          name: e.payload.doc.data().name,
          email: e.payload.doc.data().email,
          phone: e.payload.doc.data().phone,
          role: e.payload.doc.data().role,
          carsRepaired: e.payload.doc.data().carsRepaired,
          photo: e.payload.doc.data().photo,
          age: e.payload.doc.data().age,
          gender: e.payload.doc.data().gender,
          date: e.payload.doc.data().date,
        }
      })
    })
  }
  async getAdmins() {
    await this._firestore.collection('users', ref => ref.where("role", "==", "admin")).snapshotChanges().subscribe(res => {
      this.admins = res.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          name: e.payload.doc.data().name,
          email: e.payload.doc.data().email,
          phone: e.payload.doc.data().phone,
          role: e.payload.doc.data().role,
          carsRepaired: e.payload.doc.data().carsRepaired,
          photo: e.payload.doc.data().photo,
          age: e.payload.doc.data().age,
          gender: e.payload.doc.data().gender,
          date: e.payload.doc.data().date,
        }
      })
    })
  }
  async getMechs() {
    await this._firestore.collection('users', ref => ref.where("role", "==", "mechanic")).snapshotChanges().subscribe(res => {
      this.mechanics = res.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          name: e.payload.doc.data().name,
          email: e.payload.doc.data().email,
          phone: e.payload.doc.data().phone,
          carsRepaired: e.payload.doc.data().carsRepaired,
          role: e.payload.doc.data().role,
          photo: e.payload.doc.data().photo,
          age: e.payload.doc.data().age,
          gender: e.payload.doc.data().gender,
          date: e.payload.doc.data().date,
        }
      })
    })
  }
  async getTotalCars() {
    await this._firestore.collection('cars').snapshotChanges().subscribe(res => {
      this.cars = res.map((e: any) => {
        return {
          model: e.payload.doc.data().model,
          brand: e.payload.doc.data().brand,
          initDate: e.payload.doc.data().initDate,
          ownerName: e.payload.doc.data().ownerName,
          serial: e.payload.doc.data().serial,
          year: e.payload.doc.data().year,
          timesRepaired: e.payload.doc.data().timesRepaired,
          plate: e.payload.doc.data().plate,
          photo: e.payload.doc.data().photo,
          id2: e.payload.doc.data().id2
        }
      })
    })
  }

  async getRepairedCars() {
    await this._firestore.collection('cars', ref => ref.where("timesRepaired", ">", 0)).snapshotChanges().subscribe(res => {
      this.carsRepaired = res.map((e: any) => {
        return {
          model: e.payload.doc.data().model,
          brand: e.payload.doc.data().brand,
          initDate: e.payload.doc.data().initDate,
          ownerName: e.payload.doc.data().ownerName,
          serial: e.payload.doc.data().serial,
          year: e.payload.doc.data().year,
          timesRepaired: e.payload.doc.data().timesRepaired,
          plate: e.payload.doc.data().plate,
          photo: e.payload.doc.data().photo,

        }
      })
    })
  }

  async totalMoneySpent(){
    await this._firestore.collection('users', ref => ref.where('moneySpent', '>', 0)).snapshotChanges().subscribe(res => {
      this.money = res.map((e: any) => {
        return {
          moneySpent: e.payload.doc.data().moneySpent
        }
      })
      this.sumMoney()
      return this.sumMoney()
    })
  }


  sumMoney(): Observable<number>{
     let sum: number = this.money.map(a => a.moneySpent).reduce( function (a, b) {
       return a+b
     })
     this.profit = sum;
     return
  }



  async showDataS() {
    var bestMech;
    var bestCarAux;
    var hightM = -1;
    var hightC = -1;


       for (var mech in this.mechanics) { //BEST MECHANIC SEARCH
      if (this.mechanics[mech].carsRepaired > hightM) {
        bestMech = this.mechanics[mech];
        hightM = this.mechanics[mech].carsRepaired;
      }
    }
    this.bestMech = bestMech
    for (var car in this.cars) { //SEARCH CAR MOST REPAIRED
      if (this.cars[car].timesRepaired > hightC) {
        bestCarAux = this.cars[car];
        hightC = this.cars[car].timesRepaired;
      }
      this.bestCar = bestCarAux
    }
    this.showData = true;
  }


  getClientInfo() {
    this.showMore = this.clients;
    this.personalInfo = true;
  }
  getAdminInfo() {
    this.showMore = this.admins;
    this.personalInfo = true;
  }
  getManInfo() {
    this.showMore = this.managers;
    this.personalInfo = true;
  }
  getMechInfo() {
    this.showMore = this.mechanics;
    this.personalInfo = true;;
  }

  getCarsInfo() {
    this.showMore = this.cars
    this.carInfo = true;
  }

  getAppointmentsInfo() { //pen
    this.showMore = this.appointmentsC;
    this.tecnicalInfo = true;
  }




  open(content) { //MODAL
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

  close() {
    this.personalInfo = false;
    this.tecnicalInfo = false;
    this.carInfo = false;
  }


}
