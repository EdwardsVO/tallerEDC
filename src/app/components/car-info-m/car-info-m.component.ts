import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-car-info-m',
  templateUrl: './car-info-m.component.html',
  styleUrls: ['./car-info-m.component.scss']
})
export class CarInfoMComponent implements OnInit {
  
  dataUploaded: boolean = false;
  authForm: FormGroup;
  marca: string;
  color:string;
  year: string;
  modelo:string;
  placa: string;
  kilometraje: string;
  tanque:string;
  extra:string;
  
  typesLists: string[] = ['Caucho de Repuesto', 'Llaves', 'Gato'];
  typesLists2: string[] = ['Herramiebtas', 'Reproductor', 'Otros'];
  

  constructor() { 
   }

  


  ngOnInit(): void {
  }

  
}
