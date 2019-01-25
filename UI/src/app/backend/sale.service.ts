import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { ProductType } from '../model/sale/ProductType';
import { Product } from '../model/sale/Product';
import { User } from '../model/security/User';
import { CreditCard } from '../model/sale/CreditCard';
import { BuyCart } from '../model/sale/BuyCart';
import { SaleRequest } from '../model/sale/SaleRequest';
import { SaleRequestDetail } from '../model/sale/SaleRequestDetail';

const userToken = 'Basic ' + btoa(environment.API.USER + ':' + environment.API.PASSWORD);
const URL = environment.API.URl;
const apiHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Token', environment.API.TOKEN)
    .set('Authorization', userToken);

const httpOption = {
    headers: apiHeaders
};

@Injectable()

export class SaleService {
    constructor(private http: HttpClient) {
    }

    public GetProductType(model: ProductType): Observable<ProductType[]> {
        const url = URL + 'Venta/TipoProducto';
        const user = User.GetFromSession();
        const parameters = JSON.stringify({
            Id: model.Id,
            Enterprise: user.Enterprise.Id,
            Name: model.Name,
            Image: model.Image,
            Parent: model.Parent
        });

        return this.http.post<ProductType[]>(url, parameters, httpOption);
    }

    public GetProduct(model: Product): Observable<Product[]> {
        const url = URL + 'Venta/Producto';
        const user = User.GetFromSession();
        const parameters = JSON.stringify({
            Id: model.Id,
            Enterprise: user.Enterprise.Id,
            Type: model.Type.Id,
            Name: model.Name,
            Description: model.Description,
            Price: model.Price
        });

        return this.http.post<Product[]>(url, parameters, httpOption);
    }

    public GetCreditCard(model: CreditCard): Observable<CreditCard[]> {
        const url = URL + 'Venta/TarjetaCredito';

        return this.http.post<CreditCard[]>(url, model.JSON(), httpOption);
    }

    public SaveSale(model: BuyCart): Observable<any> {
        const url = URL + 'Venta/RegistrarCompra';
        const products = [];

        for (let i = 0; i < model.Products.length; i++) {
            const product = model.Products[i];
            products.push({
                Id: product.Id,
                Price: product.Price,
                Quantity: product.Quantity
            });
        }

        const parameters = {
            Customer: {
                Address: model.Customer.Address,
                CardNumber: model.Customer.CardNumber,
                Child: {
                    Id: model.Customer.Child.Id,
                    Store: {
                        Id: model.Customer.Child.Store.Id
                    }
                },
                CompleteName: model.Customer.CompleteName,
                CreditHouse: {
                    Id: model.Customer.CreditHouse.Id,
                    Name: model.Customer.CreditHouse.Name
                },
                ExpireMonth: model.Customer.ExpireMont,
                ExpireYear: model.Customer.ExpireYear,
                TaxNumber: model.Customer.TaxNumber,
                User: model.Customer.User,
                CardName: model.Customer.CardName,
                VCC: model.Customer.VCC
            },
            Products: products,
            TotalAmmout: model.TotalAmmout,
            TotalItems: model.TotalItems
        };

        return this.http.post<any>(url, JSON.stringify(parameters), httpOption);
    }

    public GetSaleRequestHeader(model: any): Observable<SaleRequest[]> {
        const url = URL + 'Venta/Compras';

        return this.http.post<SaleRequest[]>(url, JSON.stringify(model), httpOption);
    }

    public GetSaleRequestDetail(model: any): Observable<SaleRequestDetail[]> {
        const url = URL + 'Venta/ComprasDetalle';

        return this.http.post<SaleRequestDetail[]>(url, JSON.stringify(model), httpOption);
    }
}
