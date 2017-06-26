import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CartService } from '../../providers/cart-service';
import * as firebase from 'firebase';

import { Candy } from '../candy/candy';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'cart',
  templateUrl: 'cart.html'  
})

export class CartPage {
  sell: FirebaseListObservable<SoldItem[]>  

  constructor(public navCtrl: NavController, private db: AngularFireDatabase, public cart: CartService, private auth: AuthService, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.sell = db.list('/sell');    
  }

  remove(index) {    
    this.cart.remove(index);    
  }

  buy() {

    const confirm = this.alertCtrl.create({
      title: 'Staðfesting',
      message: 'Ertu viss um að þú viljir staðfesta þessi kaup?',
      buttons: [{
        text: 'Nei',
        handler: () => {}
      }, {
        text: 'Já',
        handler: () => {  
          
          this.cart.getProducts().reduce((prev,curr,index) => {

            let item: SoldItem = {
              candyId: curr.$key,
              date: new Date().getTime(),
              userId: this.auth.currentUser.uid,
              paid: false
            };

            return prev.then(() => this.sell.push(item)).then(() => {
              const candy = this.db.object('/candy/'+item.candyId);
              return candy.first().toPromise().then(candySnap => candy.update({ stock: candySnap.stock-1 }));                
            });                          
         
          },Promise.resolve()).then(() => {

            const toast = this.toastCtrl.create({
              message: 'Kaup á nammi tókst',
              duration: 1500,
              position: 'top'
            })

            toast.present();

            toast.onDidDismiss(() => {
              this.navCtrl.pop();
              this.cart.empty();        
            });      
          }).then(() => {
            // Uppfæra stöðu
          })
          
        }
      }]
    });

    if (this.cart.count() > 0) {
      confirm.present();
    }
    else {
      this.alertCtrl.create({
        title: 'Karfa tóm',
        subTitle: 'Karfan þín er tóm. Veldu þér nammi fyrst.',
        buttons: ['OK']
      }).present();    
    }
  }     
}

export interface SoldItem {
  candyId: string
  date: Number,
  userId: string
  paid: boolean
}
