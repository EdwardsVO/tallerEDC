import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { MechanicCrudService } from 'src/app/services/mechanic-crud.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.component.html',
  styleUrls: ['./codigo-qr.component.scss']
})
export class CodigoQRComponent implements OnInit {

  value = ''

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasDevices: boolean;
  hasPermission: boolean;
  //qrResultString: string;
   qrResultString: string = 'xWxl0PEBI5F9M8RJBjB5';

  qrResult: Result;

  extraTire: boolean = false;
  keys: boolean= false;
  gato: boolean= false;
  stereo: boolean= false;
  tools: boolean= false;
  scratches: boolean= false;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;


  mechanicName = ""
  mechanicId = ""
  scannerEnabled: boolean;
  information: string;

  id: string;
  subscription: Subscription;


  constructor(private _mechSvc: MechanicCrudService, private _firestore: AngularFirestore, private _router: Router) { }

  ngOnInit(): void {

    this._firestore.collection('users').doc(localStorage.getItem('user')).snapshotChanges().subscribe(res => {
      this.mechanicName = res.payload.get('name');
      this.mechanicId = res.payload.get('id');
    })

    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;

      // selects the devices's back camera by default
      for (const device of devices) {
          if (/back|rear|environment/gi.test(device.label)) {
              // this.scanner.changeDevice(device);
              this.currentDevice = device;
              break;
          }
      }
    });

    // this.scanner.camerasNotFound.subscribe(() => this.hasDevices = false);
    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
    // this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);

    this.subscription = this._mechSvc.currentId.subscribe(id => this.id = id)

  }

    handleQrCodeResult(resultString: string) {
    this.qrResultString = resultString;
    console.log(resultString);
    this.confirmWork(resultString);
  }

  confirmWork(appointmentId) {
    this._mechSvc.confirmWork(appointmentId, this.mechanicName)
    console.log(`Cita: ${appointmentId} ha sido asignada a ${this.mechanicName}! A chambear`);
    this._router.navigate(['/diagnostic'], {queryParams: { qrId: this.qrResultString }})
    this.getString()
  }

  getString(){
    console.log(this.qrResultString);
    return this.qrResultString
  }



}
