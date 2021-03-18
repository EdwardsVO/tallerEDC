import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userID: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  editInfo: boolean = false;
  dataUploaded: boolean = false;
  userToEdit: User;
  authForm: FormGroup;

  constructor(private _db: CrudService, private _auth: AuthService, private _afs: AngularFirestore, private _fb: FormBuilder) { }

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
      email: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }

  handleUpdateProfile(){
    this._db.updateUserProfile(
      this.userID,
      this.authForm.get('name').value,
      this.authForm.get('email').value,
      this.authForm.get('phone').value,
      )
  }


}
