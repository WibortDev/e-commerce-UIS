import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/product.model';
import { FavProductService } from 'src/app/services/fav-product/fav-product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy {
  products: ProductModel[] = [];
  productFavSubscription!: Subscription;

  constructor(public favService: FavProductService) {}

  ngOnInit(): void {
    this.products = this.favService.getProducts();
    this.productFavSubscription = this.favService.getProductsUpdate().subscribe((products: ProductModel[]) => {
      this.products = products;
    });
  }

  ngOnDestroy(): void {
    this.productFavSubscription.unsubscribe();
  }

  removeFav(id: string): void {
    this.favService.removeFav(id);
  }

}
