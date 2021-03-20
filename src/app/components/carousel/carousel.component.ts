import { Component, OnInit } from '@angular/core';
import firebase from 'firebase'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  slides: any [] = []
  storage = firebase.storage();
  storageRef = this.storage.ref();
  carouselImg = this.storageRef.child('page/carousel').listAll();
  imageURL: string;
  ngOnInit(): void {
    this.getCarouselImages();
  }

  async getCarouselImages() {
    try {
      await
      this.carouselImg.then((res) => {
       res.items.forEach((folderRef) => {
         folderRef.getDownloadURL().then((url => {
           this.imageURL = url;
           this.slides.push(this.imageURL);
         }))
       })
     })
       } catch (err) {
         console.log(err);
       }
  }
}
