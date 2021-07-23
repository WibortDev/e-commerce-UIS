import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ProductModel } from '../models/product.model'

@Component( {
  selector: 'form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
} )

export class FormProductComponent implements OnInit {
  products: ProductModel[] = [];
  @Output() onSubmitProduct: any = new EventEmitter<ProductModel>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitForm(form: NgForm): void {
    this.onSubmitProduct.emit(form.value);
    form.reset();
  }

}
