import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductModel } from '../../models/product.model';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { API_URL } from '../api';

@Injectable({
  providedIn: 'root'
})

export class PostProductService {
  products: ProductModel[] = [];
  productsUpdate = new Subject<ProductModel[]>();

  constructor(private http: HttpClient, private router: Router) { }

  addProduct(product: ProductModel) {
    this.http.post<ProductModel>( `${API_URL}/product`, product).subscribe( (response) => {
      this.products.push( {
        _id: response._id,
        title: product.title,
        description: product.description,
        price: product.price,
        imgUrl: product.imgUrl
       } );

       this.productsUpdate.next([...this.products]);
       this.router.navigate(['/products']);
    });
  }

  getProduct(id: string) {
    return this.http.get<ProductModel>( `${API_URL}/product/${id}` );
  }

  getProducts() {
    this.http.get<ProductModel[]>(`${API_URL}/product`).subscribe( (products) => {
      this.products = products;
      this.productsUpdate.next([...this.products]);
    });

    return [...this.products];
  }

  getProductsUpdate() {
    return this.productsUpdate.asObservable();
  }

  addFav(id: string) {
    this.http.post( `${API_URL}/fav`, { id }).subscribe( (response) => {
      console.log( response );
    } );
  }

  deleteProduct(id: string) {
    this.http.delete(`${API_URL}/product/${id}`).subscribe( ( _response ) => {
      this.products = this.products.filter( (product) => {
        return product._id !== id;
      });

      this.productsUpdate.next([...this.products]);
    });
  }

  editProduct(product: ProductModel, id: string) {
    this.http.put<ProductModel>( `${API_URL}/product/${ id }`, product).subscribe( (response) => {
      this.products = this.products.map( (product) => {
        if (product._id === response._id) {
          return {
            _id: response._id,
            title: product.title,
            description: product.description,
            price: product.price,
            imgUrl: product.imgUrl
          };
        }
        return product;
      });

      this.productsUpdate.next([...this.products]);
      this.router.navigate(['/products']);
    });
  }
}
