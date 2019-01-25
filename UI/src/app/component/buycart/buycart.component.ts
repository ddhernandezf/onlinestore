import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BuyCart } from '../../model/sale/BuyCart';
import { Product } from './../../model/sale/Product';
import { CreditCard } from './../../model/sale/CreditCard';
import { Pattern } from './../../model/general/Pattern';
import { User } from './../../model/security/User';
import { Child } from './../../model/security/Child';

import { SaleService } from '../../backend/sale.service';

@Component({
  selector: 'app-buy-cart',
  templateUrl: './buycart.component.html',
  styleUrls: ['./buycart.component.css']
})

export class BuyCartComponent {
  IsPayment: boolean;
  Cart: BuyCart;
  CreditCards: CreditCard[];
  RegEx: Pattern;
  GeneralError: string;

  @Input() CurrentUser: User;
  @Input() CurrentChild: Child;
  @Output() BlockWindow = new EventEmitter<boolean>();
  @Output() CloseModal = new EventEmitter<boolean>();
  @Output() ShowMessage = new EventEmitter<boolean>();

  @Input() set Items(items: Product[]) {
    this.Cart.Products = items;
    this.Cart.Count();

    this.GetCreditCards(new CreditCard(null, null, null, null)).subscribe(
            data => {
              this.CreditCards = data;
              this.Cart.Customer.CreditHouse = this.CreditCards[0];
              this.SelectCreditHouse(this.Cart.Customer.CreditHouse.Name);
            },
            error => {
                console.log(error);
            });
  }

  constructor(private Api: SaleService) {
    this.IsPayment = false;
    this.Cart = new BuyCart();
    this.Cart.Customer.CreditHouse = new CreditCard(null, null, null, null);
    this.RegEx = new Pattern();
    this.RegEx.SetCurrentCreditCardPattern('AMEX');
    this.GeneralError = null;
  }

  ChangeTab(value) {
    this.IsPayment = value;
  }

  More(product: Product) {
    const original = this.GetFromSession(product);
    product.Quantity++;
    const result = product.Quantity - original.Quantity;
    original.Quantity = result;
    this.Cart.Add(original);
  }

  Less(product: Product) {
    const original = this.GetFromSession(product);
    product.Quantity--;

    if (product.Quantity < 1) {
      product.Quantity = 1;
    }

    const result = product.Quantity - original.Quantity;
    original.Quantity = result;
    this.Cart.Add(original);
  }

  Delete(product: Product) {
    const cart = new BuyCart();
    cart.Delete(product);
    this.Cart.Products = cart.Get();
  }

  SelectCreditCard(creditcard: CreditCard) {
    this.Cart.Customer.CreditHouse = creditcard;
    this.SelectCreditHouse(creditcard.Name);
  }

  SelectCreditHouse(credithouse: string): void {
    this.RegEx.SetCurrentCreditCardPattern(credithouse);
  }

  Submit() {
    this.Cart.Customer.User = this.CurrentUser.Email;
    this.Cart.Customer.Child = this.CurrentChild;

    this.BlockWindow.emit(true);

    this.SaveSale(this.Cart).subscribe(
      data => {
        this.Cart.Clean();
        this.Cart.Customer = this.Cart.ClearCustomer();

        this.GeneralError = null;

        this.BlockWindow.emit(false);
        this.CloseModal.emit(true);
        this.ShowMessage.emit(true);
      },
      error => {
        this.BlockWindow.emit(false);
        this.GeneralError = error.error;
      });
  }

  private GetFromSession(product: Product) {
    const data = new BuyCart().Get();
    let index = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i].Id === product.Id) {
        index = i;
        break;
      }
    }

    return data[index];
  }

  private GetCreditCards(model: CreditCard) {
    return this.Api.GetCreditCard(model);
  }

  private SaveSale(model: BuyCart) {
    return this.Api.SaveSale(model);
  }
}
