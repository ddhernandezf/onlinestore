import { CreditCard } from './CreditCard';
import { Child } from '../security/Child';

export class Customer {
  CreditHouse: CreditCard;
  CardNumber: number;
  ExpireMont: number;
  ExpireYear: number;
  VCC: number;
  CardName: string;
  CompleteName: string;
  Address: string;
  TaxNumber: string;
  User: string;
  Child: Child;

  constructor(credithouse: CreditCard, cardnumber: number, expiremont: number, expireyear: number,
                vcc: number, cardname: string, completename: string, address: string, taxnumber: string, user: string,
                child: Child) {
    this.CreditHouse = credithouse;
    this.CardNumber = cardnumber;
    this.ExpireMont = expiremont;
    this.ExpireYear = expireyear;
    this.VCC = vcc;
    this.CardName = cardname;
    this.CompleteName = completename;
    this.Address = address;
    this.TaxNumber = taxnumber;
    this.User = user;
    this.Child = child;
  }
}
