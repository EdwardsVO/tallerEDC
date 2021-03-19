import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.scss']
})
export class RequirementsComponent implements OnInit {

  typesLists: string[] = ['Caucho de Repuesto', 'Llaves', 'Gato'];
  typesLists2: string[] = ['Herramiebtas', 'Reproductor', 'Otros'];
  
  constructor() { 

  }

  ngOnInit(): void {
  }

}
