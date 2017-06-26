import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import * as moment from 'moment';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../../providers/auth-service';
import { CartService } from '../../providers/cart-service';
import { Candy } from '../candy/candy';
import * as firebase from 'firebase';


@Component({
  selector: 'history',
  templateUrl: 'history.html'  
})

export class HistoryPage {
  unpaidItems: Observable<Sell[]>  
  paidItems: Observable<Sell[]>  
  historyType: string

  constructor(public navCtrl: NavController, db: AngularFireDatabase, private auth: AuthService, public cart: CartService) {
    const allItems = db.list('/sell', {
      query: {
        orderByChild: 'userId',
        equalTo: this.auth.currentUser.uid
      }
    }).map(items => items.map(item => {                
        item.candy = db.object('/candy/'+item.candyId)
        return item        
    }));
    

    this.unpaidItems = allItems.map(filterOrderAndGroup(false));      
    this.paidItems = allItems.map(filterOrderAndGroup(true));
    this.historyType = 'unpaid';
  }
}

const filterOrderAndGroup = function(paid) {
    return function(arr) {
      console.log(arr);
      const filtered = arr.filter(item => item.paid === paid);
      const ordered = orderBy(filtered,'date','desc');      
      const test = groupByDate(ordered);

      return test;
    }
}

const groupByDate = function(arr) {  
  return arr.reduce((res,item,index) => {
    const prevItem = res[index-1];
    
    const prevDate = prevItem ? prevItem.date : undefined;
    const thisDate = moment(item.date).format('DD.MM.YYYY');
    

    if (prevDate !== thisDate) {
      res.push({
          date: thisDate,
          items: []
      });      
    }

    res[res.length-1].items.push(item);
      
    
    return res;
  },[]);  
}

export interface Sell {
  candyId: string
  date: number
  userId: string
  paid: boolean
  candy: FirebaseObjectObservable<Candy>
}
