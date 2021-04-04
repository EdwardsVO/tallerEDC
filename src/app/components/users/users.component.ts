import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AdminCrudService } from 'src/app/services/admin-crud.service';
import { CrudService } from 'src/app/services/crud.service';
import {ToastrService} from 'ngx-toastr';


interface selection {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  authForm = FormGroup;
  userToEdit: User;
  editState: boolean = false;
  editInfo: boolean = false;

  updateInfo(): boolean {
    return this.editInfo = !this.editInfo
  }

  constructor(private _db: CrudService, private _fb: FormBuilder, private _adminService: AdminCrudService, private toastr: ToastrService ) { }

  ngOnInit(): void {


    this._db.getUsers().subscribe(users => {
      this.users = users;
    });

}

filterUser: string;

showSucces(message,title){
  this.toastr.success('message','LISTO');
 }

  updateRoleForm(user){
    this.editState = true;
    this.userToEdit = user;
  }

  clearState() {
    this.editState = false;
    this.userToEdit = null;
  }

  updateUser(user){
    this._adminService.updateUser(user);
    this.toastr.success('Usiario actualizado','LISTO');
    this.clearState();
  }

}



