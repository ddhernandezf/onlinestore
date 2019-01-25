export class SaleRequest {
    Id: number;
    Status: number;
    Corporation: number;
    CorporationName: string;
    Enterprise: number;
    EnterpriseName: string;
    Store: number;
    StoreName: string;
    Student: number;
    StudentName: string;
    TransactionNumber: number;
    AuthorizationNumber: number;
    CardName: string;
    CustomerName: string;
    TaxNumber: string;
    StatusName: string;
    Address: string;
    CreditCard: number;
    CreditCardName: string;
    Username: string;
    SaleDate: Date;
    Total: number;

    constructor (id: number, status: number, corporation: number, corporationname: string, enterprise: number,
                enterprisename: string, store: number, storename: string, student: number, studentname: string,
                transactionnumber: number, authorizationnumber: number, cardname: string, customername: string,
                taxnumber: string, statusname: string, address: string, creditcard: number, creditCardname: string,
                username: string, saledate: Date, total: number) {
        this.Id = id;
        this.Status = status;
        this.Corporation = corporation;
        this.CorporationName = corporationname;
        this.Enterprise = enterprise;
        this.EnterpriseName = enterprisename;
        this.Store = store;
        this.StoreName = storename;
        this.Student = student;
        this.StudentName = studentname;
        this.TransactionNumber = transactionnumber;
        this.AuthorizationNumber = authorizationnumber;
        this.CardName = cardname;
        this.CustomerName = customername;
        this.TaxNumber = taxnumber;
        this.StatusName = statusname;
        this.Address = address;
        this.CreditCard = creditcard;
        this.CreditCardName = creditCardname;
        this.Username = username;
        this.SaleDate = saledate;
        this.Total = total;
    }

    public JSON () {
      return JSON.stringify(this);
    }
  }
