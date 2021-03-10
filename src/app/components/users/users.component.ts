import { Component, OnInit } from '@angular/core';

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

  users: selection[] = [
    {value: 'op-0', viewValue: 'Cliente'},
    {value: 'op-1', viewValue: 'Gerente'},
    {value: 'op-2', viewValue: 'Mecanico'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}



