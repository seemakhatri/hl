import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-dividend-detail',
  templateUrl: './dividend-detail.component.html',
  styleUrls: ['./dividend-detail.component.scss']
})
export class DividendDetailComponent implements OnInit {
  companyId: any;
  companyDetails: any;
  markerPosition: number | undefined;
  isPrevious: boolean = false;
  isNext: boolean = false;
  currentDate: Date = new Date();

  previousExDividendDate: string | undefined;
  previousPaymentDate: string | undefined;
  nextExDividendDate: string | undefined;
  nextPaymentDate: string | undefined;

  isCompleted: boolean = false;
  isUpcoming: boolean = false;

  constructor(private route: ActivatedRoute, private themeService: ThemeService) {}

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode() {
    return this.themeService.isDarkModeEnabled();
  }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');
    this.loadCompanyDetails(this.companyId);
  }

  loadCompanyDetails(id: string) {
    switch (id) {
      case '1':
        this.companyDetails = { id, name: 'Company A', description: 'Company A specializes in technology products.', exDividendDate: '2024-03-20', paymentDate: '2024-04-05' };
        break;
      case '2':
        this.companyDetails = { id, name: 'Company B', description: 'Company B operates in the energy sector.', exDividendDate: '2024-06-8', paymentDate: '2024-07-10' };
        break;
      case '3':
        this.companyDetails = { id, name: 'Company C', description: 'Company C is known for its healthcare services.', exDividendDate: '2024-06-01', paymentDate: '2024-06-30' };
        break;
      case '4':
        this.companyDetails = { id, name: 'Company D', description: 'Company D focuses on consumer goods.', exDividendDate: '2024-09-01', paymentDate: '2024-09-30' };
        break;
      case '5':
        this.companyDetails = { id, name: 'Company E', description: 'Company E provides financial services.', exDividendDate: '2024-10-01', paymentDate: '2024-10-20' };
        break;
      default:
        this.companyDetails = null;
    }
    this.generateRandomDates();
    this.calculateMarkerPosition();
    this.checkDates();
  }

  calculateMarkerPosition() {
    if (!this.companyDetails) {
      this.markerPosition = 0;
      return;
    }
  
    const currentDate = new Date();
    const exDividendDate = new Date(this.companyDetails.exDividendDate);
    const paymentDate = new Date(this.companyDetails.paymentDate);
  
    if (this.isNext) {
      this.markerPosition = 0;
    } else if (this.isPrevious) {

      this.markerPosition = 100;
    } else if (currentDate > paymentDate) {
      this.markerPosition = 100;
    } else if (currentDate < exDividendDate) {
      this.markerPosition = 0;
    } else {
      const totalDuration = paymentDate.getTime() - exDividendDate.getTime();
      const elapsedDuration = currentDate.getTime() - exDividendDate.getTime();
  
      const totalDays = Math.ceil(totalDuration / (1000 * 3600 * 24));
      const elapsedDays = Math.ceil(elapsedDuration / (1000 * 3600 * 24));
  
      const positionPercentage = (elapsedDays / totalDays) * 100;
      this.markerPosition = positionPercentage > 100 ? 100 : (positionPercentage < 0 ? 0 : positionPercentage);
    }
  }
  

  getRemainingDaysArray(): number[] {
    if (!this.companyDetails) {
      return [];
    }

    const currentDate = new Date();
    const paymentDate = new Date(this.companyDetails.paymentDate);

    if (currentDate > paymentDate) {
      return [];
    }

    const totalDuration = paymentDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(totalDuration / (1000 * 3600 * 24));

    return Array.from({ length: remainingDays > 0 ? remainingDays : 0 }, (_, i) => i + 1);
  }

  generateRandomDates() {
    if (!this.companyDetails) return;
  
    const currentExDividendDate = new Date(this.companyDetails.exDividendDate);
    const currentPaymentDate = new Date(this.companyDetails.paymentDate);
    const previousExDividendDate = this.getPreviousDateWithinMonths(currentExDividendDate, [1, 2, 3, 4]);
    const previousPaymentDate = this.getPreviousDateWithinMonths(new Date(previousExDividendDate), [1, 2, 3, 4], false);
  
    this.previousExDividendDate = previousExDividendDate;
    this.previousPaymentDate = previousPaymentDate;
  
    this.nextExDividendDate = this.getRandomDate(currentExDividendDate, 120, 150);
    this.nextPaymentDate = this.getRandomDate(currentPaymentDate, 120, 150);
  }
  
  getPreviousDateWithinMonths(referenceDate: Date, months: number[], before = true): string {
    const currentYear = new Date().getFullYear();
    let validDates: Date[] = [];
  
    months.forEach(month => {
      const date = new Date(currentYear, month, 1);
      while (date.getMonth() === month) {
        if (before ? date < referenceDate : date > referenceDate) {
          validDates.push(new Date(date));
        }
        date.setDate(date.getDate() + 1);
      }
    });
  
    validDates = validDates.filter(date => before ? date < referenceDate : date > referenceDate);

    if (validDates.length > 0) {
      const randomIndex = Math.floor(Math.random() * validDates.length);
      return validDates[randomIndex].toISOString().split('T')[0];
    }
  
    return referenceDate.toISOString().split('T')[0];
  }
  
  getRandomDate(referenceDate: Date, minOffset: number, maxOffset: number): string {
    const offset = Math.floor(Math.random() * (maxOffset - minOffset + 1) + minOffset);
    const newDate = new Date(referenceDate);
    newDate.setDate(referenceDate.getDate() + offset);
    return newDate.toISOString().split('T')[0]; 
  }

  loadPreviousCompany() {
    if (this.isNext) {
      this.isNext = false;
    } else {
      this.isPrevious = true; 
    }
    this.loadCompanyDetails(this.companyId);
  }

  loadNextCompany() {
    this.isPrevious = false; 
    this.isNext = true; 
    this.loadCompanyDetails(this.companyId);
  }


  checkDates() {
    const currentDate = new Date();
    const exDividendDate = new Date(this.companyDetails?.exDividendDate);
    const paymentDate = new Date(this.companyDetails?.paymentDate);
  
    this.isCompleted = currentDate > paymentDate || this.isPrevious;
    this.isUpcoming = currentDate < exDividendDate || this.isNext;
  }
  
}

