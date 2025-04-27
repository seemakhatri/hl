export interface Company {
    id: string;
    name: string;
    descriptionDate: Date;
    exDividendDate: Date;
    paymentDate: Date;
  }

  export class Dividend {
    companyName: string;
    exDate: string;
    paymentDate: string;
    notes: string;
    _id?: string;
    public withholdingTax?: number;
    dividendAmount?: number;
  
    constructor(companyName: string, exDate: string, paymentDate: string, notes: string) {
      this.companyName = companyName;
      this.exDate = exDate;
      this.paymentDate = paymentDate;
      this.notes = notes;
    }
  }



  export class StockSplit {
    companyName: string;
    recordDate: string;
    effectiveDate: string;
    notes: string;
    _id?: string;
  
    constructor(companyName: string, recordDate: string, effectiveDate: string, notes: string) {
      this.companyName = companyName;
      this.recordDate = recordDate;
      this.effectiveDate = effectiveDate;
      this.notes = notes;
    }
  }
  
  

  export class Consolidation {
    companyName: string;
    recordDate: string;
    effectiveDate: string;
    notes: string;
    _id?: string;
  
    constructor(companyName: string, recordDate: string, effectiveDate: string, notes: string) {
      this.companyName = companyName;
      this.recordDate = recordDate;
      this.effectiveDate = effectiveDate;
      this.notes = notes;
    }
  }

  
  export class Delisting {
    companyName: string;
    exDate: string;
    paymentDate: string;
    notes: string;
    _id?: string;
  
    constructor(companyName: string, exDate: string, paymentDate: string, notes: string) {
      this.companyName = companyName;
      this.exDate = exDate;
      this.paymentDate = paymentDate;
      this.notes = notes;
    }
  }
  