import { Component } from '@angular/core';
import { ProductModel } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedProducts: ProductModel[] = [];

  title = 'frontend';

  productCreated( product: ProductModel ) {
    console.log( product );
    this.storedProducts.push( {
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image
     } );
  }
}
