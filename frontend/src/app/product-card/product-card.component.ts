import { Component, Input, OnInit } from '@angular/core';

import { ProductModel } from '../models/product.model'

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent implements OnInit {
  @Input() products: ProductModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
