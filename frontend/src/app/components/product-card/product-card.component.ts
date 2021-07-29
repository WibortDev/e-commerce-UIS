import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/product.model';
import { PostProductService } from 'src/app/services/post-product.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent implements OnInit, OnDestroy {
  products: ProductModel[] = [];
  productSubscription!: Subscription;

  constructor(public postService: PostProductService) { }

  ngOnInit(): void {
    this.products = this.postService.getProducts();
    this.productSubscription = this.postService.getProductsUpdate().subscribe((products: ProductModel[]) => {
      this.products = products;
    });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  deleteProduct( id: string ): void {
    this.postService.deleteProduct( id );
  }
}
