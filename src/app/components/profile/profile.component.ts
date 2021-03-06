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
import {ToastrService} from 'ngx-toastr';



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
  userPhoto: string = "";

  editInfo: boolean = false;
  dataUploaded: boolean = false;
  userToEdit: User;
  authForm: FormGroup;
  selectedImg;
  path: string;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL;
  uploadState: Observable<string>;
  percentage: number;
  percentage2: boolean;
  url;

  constructor(private _db: CrudService ,private _auth: AuthService, private _afs: AngularFirestore, private _fb: FormBuilder, private modalService: NgbModal, private af:AngularFireStorage, private toastr: ToastrService,) { }


  
  // function to upload file
  // upload = (event) => {
  //   // create a random id
  //   const randomId = Math.random().toString(36).substring(2);
  //   // create a reference to the storage bucket location
  //   this.ref = this.af.ref('/images/' + randomId);
  //   // the put method creates an AngularFireUploadTask
  //   // and kicks off the upload
  //   this.task = this.ref.put(event.target.files[0]);
  //   this.uploadProgress = this.task.snapshotChanges()
  //   .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
  //   this.task.snapshotChanges().pipe(
  //     //finalize(() => this.downloadURL = this.ref.getDownloadURL())
  //   )
  //   .subscribe();
  // }

  
  ngOnInit(): void {
    this.getCurrentUser();
    this.updateProfileForm();
  };

  upload(event){
    this.selectedImg = event.target.files[0]

  }



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
    this.userPhoto = x.payload.get('photo')
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

      name: [this.userName, Validators.required],
      email: [this.userEmail],
      phone: [this.userPhone, Validators.required],
      gender: [this.userGender, Validators.required],
      age: [this.userAge, Validators.required]
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
          this.toastr.error('Vaya... Tuvimos un problema al guardar tu imagen.', 'Error')
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
              this.setProfilePic(this.url)
              this.toastr.success('Imagen guardada con exito!', 'Listo')
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

    setProfilePic(url) {
      this._db.setProfilePic(this.userID, url)
    }

}
