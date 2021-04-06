import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
  totalClients: number;
  totalMan: number;
  totalAdmins: number;
  totalMec: number;

  constructor(private _firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getAdmins();
    this.getClients();
    this.getManagers();
    this.getMechs();
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


}
