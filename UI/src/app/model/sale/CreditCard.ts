export class CreditCard {
    Id: number;
    Name: string;
    Image: string;
    JSregexp: RegExp;

    constructor (id: number, name: string, image: string, jsregexp: RegExp) {
      this.Id = id;
      this.Name = name;
      this.Image = image;
      this.JSregexp = jsregexp;
    }

    JSON() {
        return JSON.stringify(this);
    }
  }
