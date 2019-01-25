export class ProductType {
  Id: number;
  Enterprise: number;
  Name: string;
  Image: string;
  Parent: number;

  constructor (id: number, enterprise: number, name: string, image: string, parent: number) {
      this.Id = id;
      this.Enterprise = enterprise;
      this.Name = name;
      this.Image = image;
      this.Parent = parent;
  }

  public JSON () {
    return JSON.stringify(this);
  }
}
