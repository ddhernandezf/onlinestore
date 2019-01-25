export class CreditCardPattern {
  Visa: RegExp;
  MasterCard: RegExp;
  AMEX: RegExp;
  Discovery: RegExp;
  Current: RegExp;

  constructor() {
    this.Visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    this.MasterCard = /^(?:5[1-5][0-9]{14})$/;
    this.AMEX = /^(?:3[47][0-9]{13})$/;
    this.Discovery = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    this.Current = null;
  }

  SetCurrent(credithouse: string) {
    switch (credithouse) {
      case 'Visa':
        this.Current = this.Visa;
        break;
      case 'MasterCard':
      this.Current = this.MasterCard;
        break;
      case 'American Express':
      this.Current = this.AMEX;
        break;
      case 'DISCOVERY':
      this.Current = this.Discovery;
        break;
      default:
        this.Current = null;
        break;
    }
  }
}
