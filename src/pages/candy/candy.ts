import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CartService } from '../../providers/cart-service';
import * as firebase from 'firebase';

import { CartPage } from '../cart/cart';

@Component({
  selector: 'candy',
  templateUrl: 'candy.html'  
})

export class CandyPage {
  items: FirebaseListObservable<Candy[]>  

  constructor(public navCtrl: NavController, db: AngularFireDatabase, public cart: CartService, private toastCtrl: ToastController) {
    this.items = db.list('/candy');
    this.cart = cart;
  }

  addToCart(candy: Candy) {  
    if (candy.stock > this.cart.count(candy.$key))  {
      this.cart.add(candy);      
    }
    else { 
      const toast = this.toastCtrl.create({
        message: candy.name +' hefur klárast',
        showCloseButton: true,        
        closeButtonText: 'Ok',
        dismissOnPageChange: true,
        position: 'bottom'
      })

      toast.present();      
    }
  }

  goToCart() {    
    this.navCtrl.push(CartPage);
  }
}

export interface Candy {  
  name: string
  price: number  
  photo: string
  stock: number
  $key: string
}
