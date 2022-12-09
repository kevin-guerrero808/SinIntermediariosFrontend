import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductVM } from '../../../modelVMs/product.VM.model';
import { productTemplateModes } from './enums/product-template-modes';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: ProductVM;
  @Input() mode: productTemplateModes;
  productTemplateModes = productTemplateModes;

  @Output() updateProductEvent = new EventEmitter();
  @Output() deleteProductEvent = new EventEmitter();
  @Output() plusProductEvent = new EventEmitter();
  @Output() minusProductEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  updateProduct() {
    this.updateProductEvent.emit();
  }

  deleteProduct() {
    this.deleteProductEvent.emit();
  }

  plusProduct() {
    this.plusProductEvent.emit();
  }

  minusProduct() {
    this.minusProductEvent.emit();
  }



}
