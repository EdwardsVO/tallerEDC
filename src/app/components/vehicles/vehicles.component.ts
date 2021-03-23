import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VehiclesCrudService} from '../../services/vehicles-crud.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

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
  serial: string;
  repaired: boolean;
  appointmentDate: any='';
  appointmentHour: any='';


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


    this.registrarVehiculoForm = this.fb.group({
      serial: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      year: ['', Validators.required],
      placa: ['', Validators.required]
    })

    this.firestore.collection('cars', ref => ref.where("owner", "==", localStorage.getItem('user'))).snapshotChanges().subscribe(res => {
      this.cars = res.map((e: any) => {
        return {
          id: e.payload.doc.id,
          serial: e.payload.doc.data().serial,
          marca: e.payload.doc.data().marca,
          modelo: e.payload.doc.data().modelo,
          year: e.payload.doc.data().year,
          placa: e.payload.doc.data().placa,
        }
      })
    })
  }




  async addNewCar(): Promise <void> {
    try{
      await this._authservice.getCurrentUser().subscribe(resp => {
        this.owner = resp.uid

        this._vehicleservice.newCar(
          this.carId = '',
          this.owner,
          this.serial = this.registrarVehiculoForm.get('serial').value,
          this.registrarVehiculoForm.get('marca').value,
          this.registrarVehiculoForm.get('modelo').value,
          this.registrarVehiculoForm.get('year').value,
          this.registrarVehiculoForm.get('placa').value,
          this.fecha = this.formatDate(),
          this.needsReparation,
          this.appointmentConfirmed,
          this.repaired,
          this.appointmentDate,
          this.appointmentHour
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
    this.vehiclesCrudService.getSerial(this.registrarVehiculoForm.get('serial').value)
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
      marca: car.marca,
      modelo: car.modelo,
      year: car.year,
      placa: car.placa,
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
