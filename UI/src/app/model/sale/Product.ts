import { ProductType } from './ProductType';
import { ProductSpecs } from './ProductSpecs';
import { Enterprise } from '../crud/Enterprise';

export class Product {
    Id: number;
    Enterprise: Enterprise;
    Type: ProductType;
    Name: string;
    Description: string;
    Specs: ProductSpecs[];
    Images: string[];
    Price: number;
    Quantity: number;

    constructor (id: number, enterprise: Enterprise, type: ProductType, name: string, description: string, specs: ProductSpecs[],
                images: string[], price: number, quantity: number) {
      this.Id = id;
      this.Enterprise = enterprise;
      this.Type = type;
      this.Name = name;
      this.Description = description;
      this.Specs = specs;
      this.Images = images;
      this.Price = price;
      this.Quantity = quantity;
    }
  }
