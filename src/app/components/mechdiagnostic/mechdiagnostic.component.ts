import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router , ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MechanicCrudService } from 'src/app/services/mechanic-crud.service';
import { CodigoQRComponent } from './../../components/codigo-qr/codigo-qr.component';

@Component({
  selector: 'app-mechdiagnostic',
  templateUrl: './mechdiagnostic.component.html',
  styleUrls: ['./mechdiagnostic.component.scss']
})
export class MechdiagnosticComponent implements OnInit {

  @Input() id: string;

  appointmentId: string;
  mechanicName: string;
  mechanicId: string;
  appointments: any = [];


  uploadProgress: Observable<number>;
  downloadURL;
  uploadState: Observable<string>;
  percentage: number;
  percentage2: boolean;
  url;
  selectedImg;
  path: string;

  closeResult = ""
  qrResult: string;


  constructor(private _qrComponent: CodigoQRComponent, private _firestore: AngularFirestore, private _mechSvc: MechanicCrudService, private _toastr: ToastrService, private _router: Router, private af:AngularFireStorage, private modalService: NgbModal, private _route: ActivatedRoute) { }


  ngOnInit(): void {

    this._route.queryParamMap.subscribe(x => { this.qrResult = (x.get('qrId')) })

    this.appointmentId = this._qrComponent.qrResultString;

    this._firestore.collection('users').doc(localStorage.getItem('user')).snapshotChanges().subscribe(res => {
      this.mechanicName = res.payload.get('name');
      this.mechanicId = res.payload.get('id');

      this._firestore.collection('appointments', ref => ref.where("appointmentID", "==", this.qrResult)).snapshotChanges().subscribe(res => {
        this.appointments = res.map((e: any) => {
          return {
            id: e.payload.doc.id,
            carId: e.payload.doc.data().carId,
            brand: e.payload.doc.data().carBrand,
            model: e.payload.doc.data().carModel,
            plate: e.payload.doc.data().carPlate,
            year: e.payload.doc.data().carYear,
            repaired: e.payload.doc.data().repaired,
            needsReparation: e.payload.doc.data().needsReparation
          }
        })
      })
    })
  }

  updateAppointment(appointment) {
    try{
    this._mechSvc.updateAppointment(appointment);
    this._router.navigate['/mechanic']
  } catch(err) {
    this._toastr.error('Debe rellenar todos los campos del formulario.', 'ERROR')
    console.log(err);
  }

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
        this._toastr.error('Vaya... Tuvimos un problema al guardar tu imagen.', 'Error')
      }
    );
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
            this._toastr.success('Imagen guardada con exito!', 'Listo')
            this.setCarPic(this.appointmentId, this.url)
          }
        });
      })
    )
    .subscribe(url => {
      if (url) {

      }
    });
    return uploadTask.percentageChanges();
  }

  setCarPic(appointmentId, url) {
    this._firestore.collection('appointments').doc(appointmentId).update({
      photo: url
    })
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

  finishWork(carId){
    this._mechSvc.finishWork(carId)
    console.log(this.mechanicId);
  }

  finishWork2(appointmentId) {
    try {
      this._firestore.collection('appointments').doc(appointmentId).update({
      repaired: true,
      mechName: this.mechanicName
    })
    } catch(err){
      console.log(err);
      this._toastr.error('Debe rellenar todos los campos del formulario.', 'ERROR')
    }
  }

}