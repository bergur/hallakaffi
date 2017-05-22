import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {  
  public currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth) {       
    this.afAuth.authState.subscribe((user: firebase.User) => {
      this.currentUser = user;                      
    });
  }

  login(email,password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }

  logout()  {
    return this.afAuth.auth.signOut();
  }  

}
