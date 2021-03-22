import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private afStorage: AngularFireStorage) { }
  private basePath = '/pages/404';
  file: File;
  url = '';
  
  ngOnInit(): void {
    //this.getUrl()
  }

  handleFiles(event) {
    this.file = event.target.files[0];
  }

  

  //method to retrieve download url
  private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
    const url = await snap.ref.getDownloadURL();
    this.url = url;  //store the URL
    console.log(this.url);
  }
  

}
