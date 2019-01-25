import { ProductType } from './ProductType';

export class CurrentType {
  constructor() {
  }

  public static Get() {
    return JSON.parse(sessionStorage.getItem('PRODUCTTYPE'));
  }

  public static Set(type: ProductType) {
    sessionStorage.setItem('PRODUCTTYPE', JSON.stringify(type));
    return JSON.parse(sessionStorage.getItem('PRODUCTTYPE'));
  }
}
