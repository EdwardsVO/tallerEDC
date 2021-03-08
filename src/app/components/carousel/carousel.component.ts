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
      img:"assets/car.jpg",
      name:"carro 1",
      desc:"primera foto del carrusel"
    },
    {
      img:"assets/car2.jpg",
      name:"carro 2",
      desc:"segunda foto del carrusel"
    },
    {
      img:"assets/car3.jpg",
      name:"carro 3",
      desc:"tercera foto del carrusel"
    }

  ]


  ngOnInit(): void {
  }

}
