import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostProductService } from 'src/app/services/post-product/post-product.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent implements OnInit, OnDestroy {
  products: ProductModel[] = [];
  productSubscription!: Subscription;

  isAuth = false;
  isAdmin = false;
  private authListenerSub!: Subscription;
  private adminListenerSub!: Subscription;

  constructor(public postService: PostProductService, public authService: AuthService) {}

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuthenticated();
    this.isAdmin = this.authService.getIsAdmin();

    this.products = this.postService.getProducts();
    this.productSubscription = this.postService.getProductsUpdate().subscribe((products: ProductModel[]) => {
      this.products = products;
    });

    this.authListenerSub = this.authService.getAuthListener().subscribe( isAuthenticated => {
      this.isAuth = isAuthenticated;
    } );
    this.adminListenerSub = this.authService.getAdminListener().subscribe( isAdmin => {
      this.isAdmin = isAdmin;
    } );
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.authListenerSub.unsubscribe();
    this.adminListenerSub.unsubscribe();
  }

  deleteProduct( id: string ): void {
    this.postService.deleteProduct( id );
  }
}
