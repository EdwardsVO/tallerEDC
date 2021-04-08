import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AdminCrudService } from 'src/app/services/admin-crud.service';
import { CrudService } from 'src/app/services/crud.service';
import {ToastrService} from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



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
  closeResult = '';

  options = [
    'client',
    'mechanic',
    'admin',
    'manager'
  ]


  updateInfo(): boolean {
    return this.editInfo = !this.editInfo
  }

  constructor(private _db: CrudService, private _fb: FormBuilder, private _adminService: AdminCrudService, private toastr: ToastrService, private modalService: NgbModal) { }

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
    this.toastr.success('Usuario actualizado','LISTO');
    this.clearState();
  }

  disableUser(userId) {
    this._adminService.disableUser(userId);
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



