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
  
  export class MenuItem {
    label: string;
    route: string;
    _id?: string;
  
    constructor(label: string, route: string, _id?: string) {
      this.label = label;
      this.route = route;
      this._id = _id;
    }
  }

  export class StockFile {
    stockName: string;
    isin: string;
    sedolOrTicker: string;
    status?: 'pending' | 'approved' | 'rejected';
    rejectionReason?: string;
    _id?: string;
  
    constructor(
      stockName: string,
      isin: string,
      sedolOrTicker: string,
      status?: 'pending' | 'approved' | 'rejected',
      rejectionReason?: string
    ) {
      this.stockName = stockName;
      this.isin = isin;
      this.sedolOrTicker = sedolOrTicker;
      this.status = status;
      this.rejectionReason = rejectionReason;
    }
  }
  

  export class FundFile {
    fundName: string;
    isin: string;
    sedolOrTicker: string;
    status?: 'pending' | 'approved' | 'rejected';
    rejectionReason?: string;
    _id?: string;
  
    constructor(
      fundName: string,
      isin: string,
      sedolOrTicker: string,
      status?: 'pending' | 'approved' | 'rejected',
      rejectionReason?: string
    ) {
      this.fundName = fundName;
      this.isin = isin;
      this.sedolOrTicker = sedolOrTicker;
      this.status = status;
      this.rejectionReason = rejectionReason;
    }
  }
  