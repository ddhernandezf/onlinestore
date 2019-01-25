import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from './../../model/sale/Product';
import { ProductType } from './../../model/sale/ProductType';
import { Enterprise } from '../../model/crud/Enterprise';

@Component({
  selector: 'app-item-viewer',
  templateUrl: './itemviewer.component.html',
  styleUrls: ['./itemviewer.component.css']
})

export class ItemViewerComponent {
  product: Product;
  SelectedImage: string;

  @Input() set Product(product: Product) {
    this.product = product;
    this.SelectedImage = this.product.Images[0];
  }
  get Product() {
    return this.product;
  }

  @Output() CallAction = new EventEmitter<Product>();
  @Output() AddProductToCart = new EventEmitter<Product>();

  constructor() {
  }

  More() {
    this.product.Quantity++;
  }

  Less() {
    this.product.Quantity--;
    if (this.product.Quantity < 1) {
      this.product.Quantity = 1;
    }
  }

  Close() {
    this.product = new Product(null, new Enterprise(null, null, null),
                        new ProductType(null, null, null, null, null), null, null, [], [], null, null);
    this.CallAction.emit(this.product);
  }

  AddToCart() {
    this.AddProductToCart.emit(this.product);
    this.Close();
  }

  SelectImage(image: string) {
    this.SelectedImage = image;
  }
}
