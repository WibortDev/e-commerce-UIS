import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class PostProductService {
  products: ProductModel[] = [];
  productsUpdate = new Subject<ProductModel[]>();

  constructor() { }

  addProduct(product: ProductModel) {
    this.products.push( {
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image
     } );

     this.productsUpdate.next([...this.products]);
  }

  getProducts() {
    return [...this.products];
  }

  getProductsUpdate() {
    return this.productsUpdate.asObservable();
  }
}
