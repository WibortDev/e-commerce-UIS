import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FavProductService } from 'src/app/services/fav-product/fav-product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  products: ProductModel[] = [];
  productFavSubscription!: Subscription;

  constructor(public favService: FavProductService, public authService: AuthService) {}

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
