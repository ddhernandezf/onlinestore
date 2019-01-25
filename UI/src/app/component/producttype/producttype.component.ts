import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ProductType } from '../../model/sale/ProductType';

@Component({
  selector: 'app-product-type',
  templateUrl: './producttype.component.html',
  styleUrls: ['./producttype.component.css']
})

export class ProductTypeComponent {
  @Input() Type: ProductType;
  @Output() SelectingType = new EventEmitter<ProductType>();

  constructor() {
    if (this.Type === null) {
      this.Type = new ProductType(null, null, null, null, null);
    }
  }

  Selecting (type: ProductType) {
    this.SelectingType.emit(type);
  }
}
