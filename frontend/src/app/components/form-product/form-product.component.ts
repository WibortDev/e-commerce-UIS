import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { PostProductService } from 'src/app/services/post-product.service';

@Component( {
  selector: 'form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
} )

export class FormProductComponent implements OnInit {
  public isEditMode: boolean = false;
  private idEdit!: string;
  product: ProductModel = {
    _id: '',
    title: '',
    description: '',
    price: null,
    imgUrl: ''
  };

  constructor(public postService: PostProductService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( ( params: ParamMap ) => {
      if ( params.has('id') ) {
        this.isEditMode = true;
        this.idEdit = params.get('id')!;
        this.postService.getProduct( this.idEdit ).subscribe( ( product: ProductModel ) => {
          this.product = product;
        } );
      } else {
        this.isEditMode = false;
      }
    })
  }

  onSubmitForm(form: NgForm): void {
    if( form.invalid ) return;

    if ( this.isEditMode ) {
      this.postService.editProduct( form.value, this.idEdit );
    } else {
      this.postService.addProduct(form.value);
    }
    form.resetForm();
  }

}
