import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductModel } from '../models/product.model';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PostProductService {
  products: ProductModel[] = [];
  productsUpdate = new Subject<ProductModel[]>();

  api: String = "http://localhost:1215/api/v1"

  constructor(private http: HttpClient) { }

  addProduct(product: ProductModel) {
    this.http.post<ProductModel>( `${this.api}/product`, product).subscribe( (response) => {
      console.log(response);

      this.products.push( {
        title: product.title,
        description: product.description,
        price: product.price,
        imgUrl: product.imgUrl
       } );

       this.productsUpdate.next([...this.products]);
    });
  }

  getProducts() {
    this.http.get<ProductModel[]>(`${this.api}/product`).subscribe( (products) => {
      this.products = products;
      this.productsUpdate.next([...this.products]);
    });

    return [...this.products];
  }

  getProductsUpdate() {
    return this.productsUpdate.asObservable();
  }
}
