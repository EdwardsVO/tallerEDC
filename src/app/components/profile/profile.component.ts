import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  users: User[]

  constructor(private _db: CrudService) { }

  ngOnInit(): void {
    this._db.getUsers().subscribe(users => {
      // console.log(users);
      this.users = users;
    });
  }

  

}
