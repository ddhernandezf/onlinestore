import { Component, Input } from '@angular/core';

import { SaleService } from '../../backend/sale.service';

import { SaleRequest } from '../../model/sale/SaleRequest';
import { User } from '../../model/security/User';
import { Child } from '../../model/security/Child';

@Component({
    selector: 'app-request-wrapper',
    templateUrl: './salerequestwrapper.component.html',
    styleUrls: ['./salerequestwrapper.component.css']
})
export class SaleRequestWrapperComponent {
    @Input() set ViewFlag(flag: boolean) {
        this.Show = flag;

        if (this.Show === true) {
            this.GetData().subscribe(
                data => {
                    this.Data = data;
                },
                error => {
                    console.log(error);
                });
        }
      }
      get ViewFlag() {
        return this.Show;
      }

    @Input() CurrentUser: User;
    @Input() CurrentChild: Child;

    private Show: boolean;
    Data: SaleRequest[];

    constructor(private Api: SaleService) {
        this.Data = [];
    }

    private GetData() {
        return this.Api.GetSaleRequestHeader({
            Student: this.CurrentChild.Id,
            Username: this.CurrentUser.Email
        });
    }
}
