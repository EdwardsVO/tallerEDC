import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudContactService {

  private api = 'https://mailthis.to/edc'

  constructor(public fireservices:AngularFirestore, private http: HttpClient) { }

  contactMsj(Get){


    return this.fireservices.collection('contact').add(Get);

  }

  postMessage(input: any){
    return this.http.post(this.api, input, {responseType: 'text'}).pipe(
      map(
        (response) => {
          if(response){
            return response
          }
        },
        (error: any) => {
          return error;
        }
      )
    )

  }


}
