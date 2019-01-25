import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from '../component/application/app.component';
import { RoutingModule } from './routing.module';

import { AuthorizationService } from '../service/security/authorization.service';

import { SecurityService } from '../backend/security.service';
import { CrudService } from '../backend/crud.service';
import { SaleService } from '../backend/sale.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [
      AuthorizationService,
      SecurityService,
      CrudService,
      SaleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
