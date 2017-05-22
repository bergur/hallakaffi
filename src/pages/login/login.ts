import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable'

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AuthService } from '../../providers/auth-service';

import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'login',
    templateUrl: 'login.html',
    providers: [AngularFireAuth]  
})
export class LoginPage {
    nav: any;
    email: string;
    password: string;
    user: firebase.User
    

    constructor(public navCtrl: NavController, private _auth: AuthService) {
        this.nav = navCtrl;
        console.log(_auth.currentUser);
         if (_auth.currentUser) {
            
         }
    }

    login() {                    
        this._auth.login(this.email,this.password).then(user => {            
            this.nav.setRoot(TabsPage)
        });
    }

    logout() {
        this._auth.logout().then(res  => {
            console.log(this.user.email);
            console.log(res)
        });
    }

}