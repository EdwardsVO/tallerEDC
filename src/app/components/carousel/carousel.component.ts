import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  slides: any [] = [
    {
      img:"assets/Screen Shot 2021-02-02 at 5.51.05 PM.png",
      name:"Mecanico",
      desc:"Mecanico de nuestra empresa"
    },
    {
      img:"assets/mechanic.jpeg",
      name:"Mecanico 2",
      desc:"Uno de nuestros mecanicos reparando un optra"
    },
    {
      img:"assets/GettyImages_1166169921.0.jpg.webp",
      name:"Reparacion",
      desc:"Reparacion de optra"
    },
    {
      img:"assets/Important-Questions-To-Ask-When-Finding-A-Mechanical-Workshop.jpg",
      name:"Nuestro taller",
      desc:"Imagen de nuestro taller"
    }
  ]

  ngOnInit(): void {
  }

}
