import { Component, OnInit } from '@angular/core';

import { ProductModel } from '../models/product.model'

@Component({
  selector: 'form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})

export class FormProductComponent implements OnInit {
  texto: string = "";
  products: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.products.push(this.texto);
  }

}
