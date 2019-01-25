import { Component, Input } from '@angular/core';

import { SaleService } from '../../backend/sale.service';

import { SaleRequest } from '../../model/sale/SaleRequest';
import { SaleRequestDetail } from '../../model/sale/SaleRequestDetail';

@Component({
    selector: 'app-request-header',
    templateUrl: './salerequestheader.component.html',
    styleUrls: ['./salerequestheader.component.css']
})
export class SaleRequestHeaderComponent {
    @Input() HeaderItem: SaleRequest;

    Show: boolean;
    Detail: SaleRequestDetail[];

    constructor(private Api: SaleService) {
        this.Show = false;
    }

    HandleShow(value: boolean) {
        this.Show = value;

        if (this.Show === true) {
            this.GetData().subscribe(
                data => {
                    this.Detail = data;
                },
                error => {
                    console.log(error);
                });
        }
    }

    private GetData() {
        return this.Api.GetSaleRequestDetail({
            Sale: this.HeaderItem.Id
        });
    }
}
