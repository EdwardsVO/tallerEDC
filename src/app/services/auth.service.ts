import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase'
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection<User>;
  user: Observable<any>;
  




  constructor(private toastr: ToastrService,private _afAuth: AngularFireAuth, private _afs: AngularFirestore, private afAuth: AngularFireAuth) { }




  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    }
    catch (error) { console.log(error) }
  }

  async loginWithGoogle(): Promise<firebase.User | null> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const response = await this._afAuth.signInWithPopup(provider);

      if (response.user) {
        localStorage.setItem('user', response.user.uid)
        return response.user;
      }
      else {
        return null;
      }
    }
    catch (err) {
      localStorage.removeItem('user')
      return null;
    }
  }

  async logOut(): Promise<void> {
    try {
      await this._afAuth.signOut();
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    } catch (err) {

    }
  }


  getCurrentUser(): Observable<firebase.User> {
    return this._afAuth.user;
  }

  async registerNewUser(
    email: string,
    password: string
  ): Promise<firebase.User | null> {
    try {
      const response = await this._afAuth.createUserWithEmailAndPassword(email, password).then();

      if (response.user) {
        localStorage.setItem('user', response.user.uid)
        await response.user.sendEmailVerification();
        this.showSucces(`Registrado exitosamente.`,'LISTO');
        return response.user;

      }
      else {
        return null;
      }
    }catch(err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          this.showError(`El correo que intenta registrar ya existe.`,'ERROR');
          break;
          default:
            // alert(err.message);
          }
        }
  }

showError(message,title){
  this.toastr.error(message, title)
}

showSucces(message,title){
  this.toastr.success(message, title)
}


  async loginWithEmail(
    email: string,
    password: string
  ): Promise<firebase.User | null> {
    try {
      const response = await this._afAuth.signInWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user) {
            localStorage.setItem('user', response.user.uid)
            return response.user;
          } else {
            return null;
          }
        }).catch(err => {
          switch (err.code) {
            case 'auth/too-many-requests':
              this.showError(`Acceso temporalmente registringido. Intente de nuevo mas tarde`,'ERROR');
              break;
            case "auth/wrong-password":
              this.showError('Contrasenia o email incorrecto.', 'ERROR');
              break
            case 'auth/operation-not-allowed':
              this.showError('Error during sign up.', 'ERROR');
            case 'auth/weak-password':
              this.showError('Password is not strong enough. Add additional characters including special characters and numbers.', 'ERROR');
          
            default:
            // alert(err.message);
          }
        })


    }
    catch (err) {
      localStorage.removeItem('user');
      return null;
    }
  }

  isAuth(): boolean {
    return !!localStorage.getItem('user');
  }

}
