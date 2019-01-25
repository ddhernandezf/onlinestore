export class SaleRequestDetail {
    Sale: number;
    Product: number;
    ProductName: string;
    Quantity: number;
    SubTotal: number;

    constructor (sale: number, product: number, productname: string, quantity: number, subtotal: number) {
        this.Sale = sale;
        this.Product = product;
        this.ProductName = productname;
        this.Quantity = quantity;
        this.SubTotal = subtotal;
    }

    public JSON () {
      return JSON.stringify(this);
    }
  }
