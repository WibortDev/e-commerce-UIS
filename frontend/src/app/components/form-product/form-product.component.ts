import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { PostProductService } from 'src/app/services/post-product.service';

@Component( {
  selector: 'form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
} )

export class FormProductComponent implements OnInit {
  constructor(public postService: PostProductService) { }

  ngOnInit(): void {
  }

  onSubmitForm(form: NgForm): void {

    if( form.valid ) {
      this.postService.addProduct(form.value);
      form.resetForm();
    }
  }
}
