import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ProductType } from '../../model/sale/ProductType';
import { CurrentType } from '../../model/sale/CurrentType';

import { SaleService } from '../../backend/sale.service';

@Component({
  selector: 'app-product-type-wrapper',
  templateUrl: './producttypewrapper.component.html',
  styleUrls: ['./producttypewrapper.component.css']
})

export class ProductTypeWrapperComponent  {
  private block: boolean;

  @Input() set Block(block: boolean) {
    this.block = block;
    this.CallTypes(new ProductType(null, null, null, null, null));
  }

  @Output() SelectingType = new EventEmitter<ProductType>();

  Types: ProductType[];
  Current: ProductType;
  Parent: ProductType;

  constructor(private Api: SaleService) {
    this.Types = [];
    this.Parent = new ProductType(null, null, null, null, null);
    this.Current = CurrentType.Get();
  }

  private CallTypes(type: ProductType) {
    if (this.block) {
      this.Current = CurrentType.Get();

      if (this.Current.Id !== null) {
        type.Parent = this.Current.Parent;
      }

      this.GetData(type).subscribe(data => { this.OnSucess(data); }, error => { this.OnError(error); });
    }
  }

  private OnSucess(result) {
    this.Types = result;
  }

  private  OnError(result) {
      console.log(result.error);
  }

  SelectType($event) {
    this.GetData(new ProductType(null, null, null, null, $event.Id)).subscribe(
      data => {
        this.Types = data;
        this.Parent = $event;
        if (this.Types.length === 0) {
          this.SelectingType.emit($event);
        }
      },
      error => { this.OnError(error); });
  }

  GoBack() {
    const Type = CurrentType.Get();

    this.GetData(new ProductType(Type.Parent, null, null, null, null)).subscribe(
      data => {
        if (data.length === 1 && data[0].Parent === null) {
          this.GetData(new ProductType(null, null, null, null, null)).subscribe(
            result => {
              this.Types = result;
              if (this.Types.length === 0) {
                this.SelectingType.emit(Type);
              }
            },
            error => { this.OnError(error); });
        } else {
          this.Types = data;
          if (this.Types.length === 0) {
            this.SelectingType.emit(Type);
          }
        }
      },
      error => { this.OnError(error); });
  }

  All() {
    if (this.block) {
      this.SelectingType.emit(new ProductType(null, null, 'Todos', null, null));
    }
  }

  SelectParent() {
    this.SelectingType.emit(this.Parent);
  }

  private GetData(type: ProductType) {
    if (this.block) {
      return this.Api.GetProductType(type);
    } else {
      return null;
    }
  }
}
