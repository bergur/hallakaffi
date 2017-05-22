import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Hallakaffi } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CandyPage } from '../pages/candy/candy';
import { TabsPage } from '../pages/tabs/tabs';

import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth'
import { AuthService } from '../providers/auth-service';
import { CartService } from '../providers/cart-service';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

export const firebaseConfig = {  
    apiKey: "AIzaSyDHGJT4If7Fw8NmfqDQWfQdv_dN8z50nP0",
    authDomain: "hallakaffi-2d2fb.firebaseapp.com",
    databaseURL: "https://hallakaffi-2d2fb.firebaseio.com",
    projectId: "hallakaffi-2d2fb",
    storageBucket: "hallakaffi-2d2fb.appspot.com",
    messagingSenderId: "440383505953"
};

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '80d9556a'
  }
};

@NgModule({
  declarations: [
    Hallakaffi,    
    CandyPage,
    LoginPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(Hallakaffi),
    CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Hallakaffi,
    LoginPage,
    CandyPage,    
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthService,
    CartService
  ]
})
export class AppModule {}