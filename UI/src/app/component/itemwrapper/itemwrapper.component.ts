import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from './../../model/sale/Product';

@Component({
  selector: 'app-item-wrapper',
  templateUrl: './itemwrapper.component.html',
  styleUrls: ['./itemwrapper.component.css']
})

export class ItemWrapperComponent {

  @Input() Products: Product[];
  @Output() CallAction = new EventEmitter<Product>();
  @Output() AddProductToCart = new EventEmitter<Product>();

  constructor() {
  }

  SelectedProduct(value) {
    this.CallAction.emit(value);
  }

  AddToCart(product: Product) {
    this.AddProductToCart.emit(product);
  }
}
