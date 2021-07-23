import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ProductModel } from '../models/product.model'

@Component({
  selector: 'form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})

export class FormProductComponent implements OnInit {
  texto: string = "";
  products: ProductModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitForm(form: NgForm): void {
    console.log( form );

    this.products.push( {
      name: form.value.title,
      description: form.value.description,
      price: form.value.price,
      image: form.value.image
     } );
  }

}
