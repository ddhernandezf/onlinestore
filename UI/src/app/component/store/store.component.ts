import { Component } from '@angular/core';

import { ModalView } from '../../artifact/ModalView';
import { BuyCartView } from '../../artifact/BuyCartView';

import { SaleService } from '../../backend/sale.service';

import { ProductType } from '../../model/sale/ProductType';
import { Product } from '../../model/sale/Product';
import { Enterprise } from '../../model/crud/Enterprise';
import { BuyCart } from '../../model/sale/BuyCart';
import { CurrentType } from '../../model/sale/CurrentType';
import { User } from '../../model/security/User';
import { Child } from '../../model/security/Child';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.css']
})
export class StoreComponent {
    TypeHandler: ModalView;
    MenuHandler: ModalView;
    BuyCartHandler: BuyCartView;
    KidsHandler: ModalView;
    StoreHandler: ModalView;
    ConfirmMessageHandler: ModalView;
    SaleRequestHandler: ModalView;

    Products: Product[];
    SelectedProduct: Product;
    Types: ProductType[];
    SelectedType: ProductType;
    AllTypes: ProductType;
    ProductName: string;
    CurrentUser: User;
    CurrentChild: Child;

    constructor(private Api: SaleService) {
        this.TypeHandler = new ModalView(false, 'Selecionar tipo de producto...');
        this.MenuHandler = new ModalView(false, null);
        this.BuyCartHandler = new BuyCartView(false, 'Carrito de compra');
        this.KidsHandler = new ModalView(false, 'Agregar estudiante');
        this.StoreHandler = new ModalView(true, null);
        this.ConfirmMessageHandler = new ModalView(false, 'Compra');
        this.SaleRequestHandler = new ModalView(false, 'Historial de compras');

        this.ProductName = null;
        this.AllTypes = new ProductType(null, null, 'Todos', null, null);
        this.SelectedType = CurrentType.Get() === null ? CurrentType.Set(this.AllTypes) : CurrentType.Get();
        this.SelectedProduct = new Product(null, new Enterprise(null, null, null),
        new ProductType(null, null, null, null, null), null, null, [], [], null, null);

        this.CurrentUser = new User();
        this.CurrentChild = this.CurrentUser.Childs[0];

        this.LoadProducts();
    }

    Selection(element: ProductType) {
        if (element !== null) {
            this.SelectedType = element;
        }
    }

    GetSelectedProduct(value) {
        this.SelectedProduct = value;
    }

    GetSelectedType($event) {
        this.SelectedType = CurrentType.Set($event);
        this.TypeHandler.Show = false;
        this.LoadProducts();
    }

    AddToBuyCart(product: Product) {
        new BuyCart().Add(product);
        product.Quantity = 1;
    }

    CloseProductViewer(value) {
        this.SelectedProduct = value;
    }

    private LoadProducts() {
        this.ProductName = (this.ProductName === '' || this.ProductName === ' ') ? null : this.ProductName;

        this.GetProducts(new Product(null, new Enterprise(null, null, null),
                            CurrentType.Get(),
                            this.ProductName, null, null, null, null, null)).subscribe(
            data => {
                this.Products = data;
                this.StoreHandler.Show = false;
            },
            error => {
                console.log(error);
            });
    }

    SearchKeyPress($event) {
        this.ProductName = this.ProductName === null ? '' : this.ProductName;

        if ($event.key === 'Enter' || ($event.key === 'Backspace' && this.ProductName.length === 1)) {
            if ($event.key === 'Backspace') {
                this.ProductName = null;
            }

            this.LoadProducts();
        }
    }

    CatchCurrentUser($event) {
        this.CurrentUser = $event;
    }

    CatchCurrentChild($event) {
        this.CurrentChild = $event;
    }

    ManageBlockingWindow($event) {
        this.StoreHandler.Show = $event;
    }

    private GetProducts(product: Product) {
        return this.Api.GetProduct(product);
    }
}
