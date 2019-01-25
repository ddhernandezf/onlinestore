import { Component } from '@angular/core';

import { BuyCart } from '../../model/sale/BuyCart';

@Component({
  selector: 'app-buy-cart-button',
  templateUrl: './buycartbutton.component.html',
  styleUrls: ['./buycartbutton.component.css']
})

export class BuyCartButtonComponent {
  Items: BuyCart;

  constructor() {
    this.Items = new BuyCart();
  }
}
