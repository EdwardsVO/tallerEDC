import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VehiclesCrudService} from '../../services/vehicles-crud.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { isNullOrUndefined } from 'util';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  registrarVehiculoForm: FormGroup;
  carId: any;
  actualizar: boolean;
  carBrand: string;
  closeResult = '';
  owner: string;
  cars = [];
  id2 = '';
  needsReparation: boolean;
  appointmentConfirmed: boolean;
  fecha: string;
  serial: boolean;
  repaired: boolean;
  appointmentDate: any='';
  appointmentHour: any='';
  alertManager: boolean;
  repeated: boolean;
  carConverter
  


  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private vehiclesCrudService: VehiclesCrudService,
    private _vehicleservice: VehiclesCrudService,
    private _authservice: AuthService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {

    this.id2 = '';
    this.actualizar = false;
    this.needsReparation = false;
    this.appointmentConfirmed = false;
    this.repaired = false;
    this.alertManager = false;
    this.repeated = false;
    this.serial = false;
    


    this.registrarVehiculoForm = this.fb.group({
      serial: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      plate: ['', Validators.required]
    })

    this.firestore.collection('cars', ref => ref.where("owner", "==", localStorage.getItem('user'))).snapshotChanges().subscribe(res => {
      this.cars = res.map((e: any) => {
        return {
          id: e.payload.doc.id,
          serial: e.payload.doc.data().serial,
          brand: e.payload.doc.data().brand,
          model: e.payload.doc.data().model,
          year: e.payload.doc.data().year,
          plate: e.payload.doc.data().plate,
        }
      })
    })

      // Firestore data converter
    this.carConverter = {
      toFirestore: function(car) {
          return {
              serial: car.serial
              };
      },
      fromFirestore: function(snapshot, options){
          const data = snapshot.data(options);
          return new Vehicle(data.serial);
      }
    };
  }




  async addNewCar(): Promise <void> {
    try{
      await this._authservice.getCurrentUser().subscribe(resp => {
        this.owner = resp.uid

        this._vehicleservice.newCar(
          this.carId = '',
          this.owner,
          this.serial = this.registrarVehiculoForm.get('serial').value,
          this.registrarVehiculoForm.get('brand').value,
          this.registrarVehiculoForm.get('model').value,
          this.registrarVehiculoForm.get('year').value,
          this.registrarVehiculoForm.get('plate').value,
          this.fecha = this.formatDate(),
          this.needsReparation,
          this.appointmentConfirmed,
          this.repaired,
          this.appointmentDate,
          this.appointmentHour,
          this.alertManager
        )
        //this.checkCar(this.serial);
        this.registrarVehiculoForm.reset();
        this.modalService.dismissAll();
      })
    }catch(error){
      console.log(error)
    }
  }

  

  formatDate(){
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today.toDateString()
  }

  

  

  checkCar(){
    var db = firebase.firestore()

    db.collection("cars").where("serial", "==", this.registrarVehiculoForm.get('serial').value)
    .withConverter(this.carConverter)
    .get().then((doc) => {
      if (doc.empty){
        console.log("carro no existe!");
        this.addNewCar()
        
      } else {
        var car = doc.isEqual(doc);
        console.log(car);
        console.log('carro ya existe!')

      }}).catch((error) => {
        console.log("Error getting document:", error);
      });

    // db.collection('cars').where("serial", "==", this.registrarVehiculoForm.get('serial').value)
    // .get()
    // .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       if (doc.exists){
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //         this.repeated = true;
    //       }

    //       console.log(this.repeated)
    //       console.log(doc.exists)
    //       if (this.repeated) {
    //         console.log('el carro ya existe');
    //       } 

    //       if(!this.repeated) {
    //         console.log('no carro')
    //       }
         
            
    //     });
    // })
  
    // this.firestore.collection('cars', ref => ref.where("serial", "==", this.registrarVehiculoForm.get('serial').value)).snapshotChanges().subscribe(res => {
    //   this.cars = res.map((e: any) => {
    //     console.log(e.payload.doc.data().serial)
    //     return {
    //       serial: e.payload.doc.data().serial
         
    //     }
        //console.log(this.serial)
        //return this.serial
       
        
    //   })
    // })


  }

  updateCar(){
    this.vehiclesCrudService.updateCar(this.registrarVehiculoForm.value, this.id2)
    .then(resp => {
      this.registrarVehiculoForm.reset();
      this.modalService.dismissAll();
    }).catch(error => {
      console.error(error);
    });
  }

  openEditar(content, car: any) {

    this.registrarVehiculoForm.setValue({
      serial: car.serial,
      brand: car.brand,
      model: car.model,
      year: car.year,
      plate: car.plate,
    });
    this.id2 = car.id;
    this.actualizar = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  delete(car):void{

      this.vehiclesCrudService.deleteCar(car);

  }

  onClick (name: string): string {

    this.carBrand = name;
    let x = (<HTMLInputElement>document.getElementById('brandChosen')).value = name.toUpperCase();
    return x;
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
