import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private existingData = [
    { Company: 'AA', 'Stock Title': 'AA Stock', ISIN: 'US1234567890', SEDOL: 'B1Y7KD5', Ticker: 'AA' },
    { Company: 'BB', 'Stock Title': 'BB Stock', ISIN: 'GB9876543210', SEDOL: 'W1D9HE6', Ticker: 'BB' },
    { Company: 'CC', 'Stock Title': 'CC Stock', ISIN: 'CA2468135790', SEDOL: 'G5L3TS9', Ticker: 'CC' },
    { Company: 'DD', 'Stock Title': 'DD Stock', ISIN: 'DE3698521470', SEDOL: 'T3C7HN2', Ticker: 'DD' },
    { Company: 'EE', 'Stock Title': 'EE Stock', ISIN: 'FR7539512840', SEDOL: 'A9I2UJ4', Ticker: 'EE' },
    { Company: 'FF', 'Stock Title': 'FF Stock', ISIN: 'JP1594872630', SEDOL: 'I7P4ER1', Ticker: 'FF' },
    { Company: 'GG', 'Stock Title': 'GG Stock', ISIN: 'AU6543219870', SEDOL: 'A6H8KJ3', Ticker: 'GG' },
    { Company: 'HH', 'Stock Title': 'HH Stock', ISIN: 'ES8745129630', SEDOL: 'Q8F5MZ6', Ticker: 'HH' },
    { Company: 'II', 'Stock Title': 'II Stock', ISIN: 'IT6325481790', SEDOL: 'N2X9PL7', Ticker: 'II' },
    { Company: 'JJ', 'Stock Title': 'JJ Stock', ISIN: 'RU7894561230', SEDOL: 'O4E6SV5', Ticker: 'JJ' }
  ];

  constructor() { }

  getExistingData() {
    return this.existingData;
  }
}
