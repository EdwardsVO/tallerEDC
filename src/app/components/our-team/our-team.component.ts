import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss']
})
export class OurTeamComponent implements OnInit {
  mates = [
    {
      img:"assets/img/placeholder.jpg",
      name:"Edward",
      last: "Vergel",
      fact: "FOUNDER",
      click: " window.open('http://www.google.com', '_blank'); return false;"
    },
    {
      img:"assets/img/placeholder.jpg",
      name:"Sebastian",
      last: "Vivas",
      fact: "FOUNDER",
    },
    
    {
      img:"assets/img/placeholder.jpg",
      name:"Ana",
      last: "Iturbe",
      fact: "FOUNDER",
    },
    {
      img:"assets/img/placeholder.jpg",
      name:"Francesca",
      last: "Marinuzzi",
      fact: "FOUNDER",
    },
    {
      img:"assets/img/placeholder.jpg",
      name:"Isabella",
      last: "Abeledo",
      fact: "FOUNDER",
    },
    
  ]

  constructor() { }

  openAna(){
    window.open("https://www.instagram.com/anaisabeliturbec/", "_blank")
  }

  ngOnInit(): void {
  }

}
