import { Injectable } from '@angular/core';

@Injectable()

export class CartService {
    products: string[];

    constructor() {
        this.products = [];
    }

    add(id) {
        console.log(this.products);
        this.products.push(id);
        console.log(this.products);
    }

    remove(id) {
        const index = this.products.indexOf(id);
        this.products.splice(index,1);
    }

    getCart() {
        return this.products;
    }
}