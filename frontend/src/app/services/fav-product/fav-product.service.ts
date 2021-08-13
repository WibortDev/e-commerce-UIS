import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductModel } from 'src/app/models/product.model';

import { API_URL } from '../api';

@Injectable({
  providedIn: 'root'
})

export class FavProductService {
  products: ProductModel[] = [];
  productsUpdate = new Subject<ProductModel[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getProducts() {
    this.http.get<[{ product: ProductModel }]>(`${API_URL}/fav`).subscribe( (response) => {
      const products: ProductModel[] = [];

      response.forEach(responseProduct => {
        products.push(responseProduct.product);
      });
      this.products = products;
      this.productsUpdate.next([...this.products]);
    });

    return [...this.products];
  }

  getProductsUpdate() {
    return this.productsUpdate.asObservable();
  }

  addFav(id: string) {
    this.http.post<{ product: ProductModel }>( `${API_URL}/fav`, { id }).subscribe( (response) => {
      this.products.push(response.product);
      this.productsUpdate.next([...this.products]);
      this.router.navigate(['/fav']);
    } );
  }

  removeFav(id: string) {
    this.http.delete<{ product: ProductModel }>( `${API_URL}/fav/${id}`).subscribe( (_response) => {
      this.products = this.products.filter( (product) => {
        return product._id !== id;
      });

      this.productsUpdate.next([...this.products]);
    } );
  }
}
