import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


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
  editInfo: boolean = false;
  dataUploaded: boolean = false;
  userToEdit: User;
  authForm: FormGroup;

  constructor(private _db: CrudService, private _auth: AuthService, private _afs: AngularFirestore, private _fb: FormBuilder, private modalService: NgbModal) { }

  path:String;
  
  upload($event){
    this.path = $event.target.files[0]
  }
  
  uploadImg(){

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
      phone: ['', Validators.required]
    })
  }

  handleUpdateProfile(){
    
    this._db.updateUserProfile(
      this.userID,
      this.authForm.get('name').value,
      this.userEmail,
      this.authForm.get('phone').value,
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
