import { Component, Input } from '@angular/core';

import { SaleRequestDetail } from '../../model/sale/SaleRequestDetail';

@Component({
    selector: 'app-request-detail',
    templateUrl: './salerequestdetail.component.html',
    styleUrls: ['./salerequestdetail.component.css']
})
export class SaleRequestDetailComponent {
    @Input() Data: SaleRequestDetail[];

    constructor() {}
}
