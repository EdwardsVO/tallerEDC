import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { VehiclesCrudService } from 'src/app/services/vehicles-crud.service';

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
  carsRepaired = [];
  bestMech: any;
  bestCar: any;
  bestClient: any;
  showData = false;

  constructor(private _firestore: AngularFirestore, private _vech: VehiclesCrudService) { }

  ngOnInit(): void {
    this.getAdmins();
    this.getClients();
    this.getManagers();
    this.getMechs();
    this.getTotalCars();
    this.getRepairedCars();
  }

  async getClients() {
    await this._firestore.collection('users', ref => ref.where("role", "==", "client")).snapshotChanges().subscribe(res => {
      this.clients = res.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          name: e.payload.doc.data().name,
          email: e.payload.doc.data().email,
          phone: e.payload.doc.data().phone,
          moneySpent: e.payload.doc.data().moneySpent
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

        }
      })
    })
  }
  
  async showDataS() {
    var bestMech;
    var bestCarAux;
    var hightM = -1;
    var hightC = -1;
  
    for(var mech in this.mechanics){ //BEST MECHANIC SEARCH
      if (this.mechanics[mech].carsRepaired > hightM){
        bestMech = this.mechanics[mech];
        hightM = this.mechanics[mech].carsRepaired;
      }
    }
    this.bestMech = bestMech
    for(var car in this.cars){ //SEARCH CAR MOST REPAIRED
      console.log(this.cars[car].timesRepaired)
      console.log(hightC)
      if(this.cars[car].timesRepaired > hightC){
        bestCarAux = this.cars[car];
        hightC = this.cars[car].timesRepaired; 
      }
      this.bestCar = bestCarAux
    }
    this.showData = true;
  }



}
