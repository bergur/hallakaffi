import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CartService } from '../../providers/cart-service';
import * as firebase from 'firebase';

@Component({
  selector: 'candy',
  templateUrl: 'candy.html'  
})

export class CandyPage {
  items: FirebaseListObservable<Candy[]>  

  constructor(public navCtrl: NavController, db: AngularFireDatabase, public cart: CartService) {
    this.items = db.list('/candy');
  }

  addToCart(candyId) {
    console.log(candyId);
    this.cart.add(candyId);
  }
}

export interface Candy {  
  name: string
  price: number
}
