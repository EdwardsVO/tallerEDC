import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VehiclesCrudService} from '../../services/vehicles-crud.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr';
import firebase from 'firebase';
import { Vehicle } from '../../models/vehicle';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize} from 'rxjs/operators';

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
  ownerName: string;
  cars = [];
  id2 = '';
  id3 = '';
  needsReparation: boolean;
  appointmentConfirmed: boolean;
  fecha: string;
  serial: boolean;
  repaired: boolean;
  appointmentDate: any='';
  appointmentHour: any='';
  alertManager: boolean;
  repeated: boolean;
  carConverter;
  photo;
  disabled: boolean;
  disabled2: '';
  url;
  selectedImg;
  percentage: number;
  percentage2: boolean;



  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL;
  uploadState: Observable<string>;
  path: string;
  ownerEmail: string;
  lastAppointment: any;
  timesRepaired: number;


  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private vehiclesCrudService: VehiclesCrudService,
    private _vehicleservice: VehiclesCrudService,
    private _authservice: AuthService,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private af: AngularFireStorage,

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
    this.disabled = false;
    this.timesRepaired = 0;
    this.percentage2 = false;




    this.registrarVehiculoForm = this.fb.group({
      serial: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      plate: ['', Validators.required],
      //photo: ['', Validators.required]
    })

    
    
    this.firestore.collection('cars', ref => ref.where("owner", "==", localStorage.getItem('user')))
    .snapshotChanges().subscribe(res => {
      this.cars = res.map((e: any) => {
        
        return {
          id: e.payload.doc.id,
          serial: e.payload.doc.data().serial,
          brand: e.payload.doc.data().brand,
          model: e.payload.doc.data().model,
          year: e.payload.doc.data().year,
          plate: e.payload.doc.data().plate,
          photo: e.payload.doc.data().photo,
          disabled: e.payload.doc.data().disabled,
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
          return new Vehicle(data.serial)
      }
    };
  }



  
  showSucces(message,title){
    this.toastr.success('message','LISTO');
   }

  upload(event){
    this.selectedImg = event.target.files[0]

  }

  

  pushPhotoToStorage(){
    const randomId = Math.random().toString(36).substring(2);
    this.path = '/images/' + randomId;
    //this.ref = this.af.ref(this.path);
    const uploadTask = this.af.upload(this.path, this.selectedImg)
    

    uploadTask.snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = this.af.ref(this.path).getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.url = url;
          }
          console.log(this.url);
        });
      })
    )
    .subscribe(url => {
      if (url) {
        console.log(url);
      }
    });
    //return this.url
    return uploadTask.percentageChanges();
  }

  uploadImage(): void {

    this.pushPhotoToStorage().subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
        console.log(this.percentage)
        if(this.percentage == 100) {
          this.percentage2 = true
        }
      },
      error => {
        console.log(error);
      }
    );
  }




  async addNewCar(): Promise <void> {
    try{
      await this._authservice.getCurrentUser().subscribe(async resp => {
        this.owner = resp.uid;
        this.ownerEmail = resp.email;
        //await this.uploadImage().subscribe(resp => {
          this.firestore.collection('users').doc(localStorage.getItem('user')).snapshotChanges().subscribe(res => {
            this.ownerName = res.payload.get('name')
            this._vehicleservice.newCar(
              this.carId = '',
              this.owner,
              this.ownerName,
              this.ownerEmail,
              this.serial = this.registrarVehiculoForm.get('serial').value,
              this.registrarVehiculoForm.get('brand').value,
              this.registrarVehiculoForm.get('model').value,
              this.registrarVehiculoForm.get('year').value,
              this.registrarVehiculoForm.get('plate').value,
              this.fecha = this.formatDate(),
              this.photo = this.url,
              this.needsReparation,
              this.appointmentConfirmed,
              this.repaired,
              this.timesRepaired,
              this.appointmentDate,
              this.appointmentHour,
              this.alertManager,
              this.disabled
          )
          this.registrarVehiculoForm.reset();
          this.toastr.success('¡Vehículo agregado exitosamente!','LISTO');

          this.modalService.dismissAll();
          })
        //})
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

  }

  updateCar(){
    this.vehiclesCrudService.updateCar(this.registrarVehiculoForm.value, this.id2)
    .then(resp => {
      this.vehiclesCrudService.updateCarPhoto(this.id2, this.url)
      this.registrarVehiculoForm.reset();
      this.toastr.success('Vehiculo actualizado exitosamente!','LISTO');
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
    this.path = car.photo;
    this.id2 = car.id;
    this.actualizar = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  disableCar(car:any){

    this.id2 = car.id;
    this.disabled = true;
    try {
    this.vehiclesCrudService.updateCarDisabledStatus(this.id2, this.disabled);
    this.vehiclesCrudService.updateCarOwner(this.id2, "");
    console.log(this.id2)
    console.log(this.disabled)
    this.toastr.success('Vehiculo deshabilitado exitosamente!','LISTO');
    } catch(err) {
      console.log(err)
      this.toastr.error('Error, verifique su información e inténtelo de nuevo!')
    }

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
