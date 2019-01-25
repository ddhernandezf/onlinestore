import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from '../component/login/login.component';
import { RegisterComponent } from '../component/register/register.component';
import { StoreComponent } from '../component/store/store.component';
import { ItemComponent } from '../component/item/item.component';
import { ItemViewerComponent } from '../component/itemviewer/itemviewer.component';
import { ItemWrapperComponent } from '../component/itemwrapper/itemwrapper.component';
import { MenuBarComponent } from '../component/menubar/menubar.component';
import { ModalWindowComponent } from '../component/modalwindow/modalwindow.component';
import { BlockerComponent } from '../component/blocker/blocker.component';
import { ProductTypeWrapperComponent } from '../component/produttypewrapper/producttypewrapper.component';
import { ProductTypeComponent } from '../component/producttype/producttype.component';
import { BuyCartComponent } from '../component/buycart/buycart.component';
import { BuyCartButtonComponent } from '../component/buycartbutton/buycartbutton.component';
import { SaleRequestHeaderComponent } from '../component/salerequestheader/salerequestheader.component';
import { SaleRequestDetailComponent } from '../component/salerequestdetail/salerequestdetail.component';
import { SaleRequestWrapperComponent } from '../component/salerequestwrapper/salerequestwrapper.component';

import { AuthorizationService } from '../service/security/authorization.service';

const routes: Routes = [
    { path: 'IniciarSesion', component: LoginComponent },
    { path: 'Registro', component: RegisterComponent },
    { path: '', component: StoreComponent, canActivate: [AuthorizationService] }
];

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        StoreComponent,
        ItemComponent,
        ItemViewerComponent,
        ItemWrapperComponent,
        MenuBarComponent,
        ModalWindowComponent,
        BlockerComponent,
        ProductTypeWrapperComponent,
        ProductTypeComponent,
        BuyCartComponent,
        BuyCartButtonComponent,
        SaleRequestHeaderComponent,
        SaleRequestDetailComponent,
        SaleRequestWrapperComponent
    ],
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ]
})
export class RoutingModule { }
