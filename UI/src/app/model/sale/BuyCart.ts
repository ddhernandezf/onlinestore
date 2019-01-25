import { Product } from './Product';
import { Customer } from './Customer';
import { CreditCard } from './CreditCard';

export class BuyCart {
  Products: Product[];
  TotalAmmout: number;
  TotalItems: number;
  Customer: Customer;

  constructor() {
    this.Products = this.GetData();
    this.Customer = new Customer(new CreditCard(null, null, null, null), null, null, null, null, null, null, null, null, null, null);
  }

  Add(product: Product) {
    this.Products = this.GetData();
    this.SetData(product);
    this.GetData();
  }

  Delete(product: Product) {
    this.Products = this.GetData();

    for (let i = 0; i < this.Products.length; i++) {
      const delement = this.Products[i];
      if (delement.Id === product.Id) {
        this.Products.splice(i, 1);
      }
    }

    sessionStorage.setItem('BUYCARTPRODUCTS', JSON.stringify(this.Products));
    this.Products = this.GetData();
  }

  ClearCustomer() {
    return new Customer(new CreditCard(null, null, null, null), null, null, null, null, null, null, null, null, null, null);
  }

  Clean() {
    sessionStorage.removeItem('BUYCARTPRODUCTS');
    this.Products = [];
    this.GetData();
  }

  Count() {
    try {
      this.Products = this.GetData();
      let counter: number;
      counter = 0;

      for (let i = 0; i < this.Products.length; i++) {
        const celement = this.Products[i];
        counter = celement.Quantity + counter;
      }

      return counter;
    } catch {
      return 0;
    }
  }

  Get() {
    return this.GetData();
  }

  JSON() {
    return JSON.stringify(this);
  }

  private GetData() {
    let product: Product[];
    let counter: number;
    let total: number;
    product = sessionStorage.getItem('BUYCARTPRODUCTS') === null ? [] : JSON.parse(sessionStorage.getItem('BUYCARTPRODUCTS'));
    counter = 0;
    total = 0;


    if (product.length > 0) {
      for (let i = 0; i < product.length; i++) {
        const item = product[i];
        counter = counter + item.Quantity;
        total = total + (item.Quantity * item.Price);
      }

      this.TotalAmmout = total;
      this.TotalItems = counter;
    }

    return product;
  }

  private SetData(product: Product) {
    let exists: boolean;
    let index: number;
    exists = false;

    for (let i = 0; i < this.Products.length; i++) {
      const selement = this.Products[i];
      if (product.Id === selement.Id) {
        exists = true;
        index = i;
        break;
      }
    }

    if (exists) {
      this.Products[index].Quantity += product.Quantity;
    } else {
      this.Products.push(product);
    }

    sessionStorage.setItem('BUYCARTPRODUCTS', JSON.stringify(this.Products));
  }
}
