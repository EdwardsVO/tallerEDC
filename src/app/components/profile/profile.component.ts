import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  closeResult = '';
  userID: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userGender: string;
  userAge: number;
  editInfo: boolean = false;
  dataUploaded: boolean = false;
  userToEdit: User;
  authForm: FormGroup;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: string;

  constructor(private _db: CrudService, private _auth: AuthService, private _afs: AngularFirestore, private _fb: FormBuilder, private modalService: NgbModal, private af:AngularFireStorage) { }

  path:String;
  
  // function to upload file
  upload = (event) => {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.ref = this.af.ref('/images/' + randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.snapshotChanges()
    .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
    this.task.snapshotChanges().pipe(
      //finalize(() => this.downloadURL = this.ref.getDownloadURL())
    )
    .subscribe();
  }

  
  ngOnInit(): void {
    this.getCurrentUser();
    this.updateProfileForm();
    };



  updateInfo(): boolean {
    return this.editInfo = !this.editInfo;
  }

  async getLoggedUser(): Promise<void>{
    await this._afs.collection('users').doc(this.userID).snapshotChanges().subscribe(x =>{
    this.userName = x.payload.get('name')
    this.userEmail = x.payload.get('email')
    this.userPhone = x.payload.get('phone')
    this.userGender = x.payload.get('gender')
    this.userAge = x.payload.get('age')

  })
  this.dataUploaded = true;
  }


  async getCurrentUser(): Promise<void>{

    await this._auth.getCurrentUser().subscribe(user => {
       this.userID = user.uid;
       this.getLoggedUser();
    })
  }

  updateProfileForm(): void {
    this.authForm = this._fb.group({

      name: ['', Validators.required],
      email: [this.userEmail],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required]
    })
  }

  handleUpdateProfile(){

    this._db.updateUserProfile(
      this.userID,
      this.authForm.get('name').value,
      this.userEmail,
      this.authForm.get('phone').value,
      this.authForm.get('gender').value,
      this.authForm.get('age').value,

      )
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
