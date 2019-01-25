
import { BuyCart } from '../model/sale/BuyCart';
import { Product } from './../model/sale/Product';

export class BuyCartView {
    Data: Product[];
    Show: boolean;
    Title: string;
    private Cart: BuyCart;

    constructor(show: boolean, title: string) {
        this.Show = show;
        this.Title = title;
        this.Data = this.Get();
    }

    Caller($event) {
        this.Show = $event;
        this.Data = this.Get();
    }

    WakeUp() {
        this.Cart = new BuyCart();
        this.Cart.Products = this.Cart.Get();

        if (this.Cart.Count() > 0) {
            this.Show = true;
            this.Data = this.Get();
        }
    }

    private Get() {
        return this.Data = new BuyCart().Get();
    }
}
