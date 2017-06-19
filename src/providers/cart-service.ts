import { Injectable } from '@angular/core';
import { Candy } from '../pages/candy/candy';

@Injectable()

export class CartService {
    products: Candy[];
    total: Number;

    constructor() {
        this.products = [];
        this.total = 0;
    }   

    add(id) {        
        this.products.push(id);
        this.calculateTotal();
    }

    remove(i) {        
        this.products.splice(i,1);
        this.calculateTotal();
    }

    count(candyId?) {
        if (candyId) {
            return this.products.filter(item => item.$key === candyId).length;
        }

        return this.products.length;
    }


    getProducts() {
        return this.products;
    }

    empty() {
        this.products = [];
        this.total = 0;
    }

    calculateTotal() {
        this.total = this.products.reduce((prev,curr:any) => (prev += Number(curr.price)),0);
    }
}