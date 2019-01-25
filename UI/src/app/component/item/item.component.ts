import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from './../../model/sale/Product';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent {

  @Input() Product: Product;
  @Output() CallAction = new EventEmitter<Product>();
  @Output() AddProductToCart = new EventEmitter<Product>();

  constructor() {
  }

  View() {
    this.CallAction.emit(this.Product);
  }

  More() {
    this.Product.Quantity++;
  }

  Less() {
    this.Product.Quantity--;
    if (this.Product.Quantity < 1) {
      this.Product.Quantity = 1;
    }
  }

  AddToCart() {
    this.AddProductToCart.emit(this.Product);
  }
}
