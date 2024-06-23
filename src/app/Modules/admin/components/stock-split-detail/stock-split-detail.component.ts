import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-stock-split-detail',
  templateUrl: './stock-split-detail.component.html',
  styleUrls: ['./stock-split-detail.component.scss']
})
export class StockSplitDetailComponent implements OnInit {

  companyId: any;
  companyDetails: any;
  markerPosition: number | undefined;
  daysUntilPayment: number | undefined;
  isPrevious: boolean = false;
  isNext: boolean = false;
  currentDate: Date = new Date();


  previousRecordDate: string | undefined;
  previousEffectiveDate: string | undefined;
  nextRecordDate: string | undefined;
  nextEffectiveDate: string | undefined;

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
        this.companyDetails = { id, name: 'Company A', description: 'Company A specializes in technology products.', recordDate: '2024-03-20', effectiveDate: '2024-04-05' };
        break;
      case '2':
        this.companyDetails = { id, name: 'Company B', description: 'Company B operates in the energy sector.', recordDate: '2024-04-20', effectiveDate: '2024-05-10' };
        break;
      case '3':
        this.companyDetails = { id, name: 'Company C', description: 'Company C is known for its healthcare services.', recordDate: '2024-06-01', effectiveDate: '2024-06-30' };
        break;
      case '4':
        this.companyDetails = { id, name: 'Company D', description: 'Company D focuses on consumer goods.', recordDate: '2024-09-01', effectiveDate: '2024-09-30' };
        break;
      case '5':
        this.companyDetails = { id, name: 'Company E', description: 'Company E provides financial services.', recordDate: '2024-10-01', effectiveDate: '2024-10-01' };
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
    const recordDate = new Date(this.companyDetails.recordDate);
    const effectiveDate = new Date(this.companyDetails.effectiveDate);

    if (this.isNext) {
      this.markerPosition = 0;
    } else if (this.isPrevious) {

      this.markerPosition = 100;
    } else if (currentDate > effectiveDate) {
      this.markerPosition = 100;
    } else if (currentDate < recordDate) {
      this.markerPosition = 0;
    } else {
      const totalDuration = effectiveDate.getTime() - recordDate.getTime();
      const elapsedDuration = currentDate.getTime() - recordDate.getTime();
  
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
    const effectiveDate = new Date(this.companyDetails.effectiveDate);

    if (currentDate > effectiveDate) {
      return [];
    }

    const totalDuration = effectiveDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(totalDuration / (1000 * 3600 * 24));

    return Array.from({ length: remainingDays > 0 ? remainingDays : 0 }, (_, i) => i + 1);
  }



  generateRandomDates() {
    if (!this.companyDetails) return;
  
    const currentRecordDate = new Date(this.companyDetails.recordDate);
    const currentEffectiveDate = new Date(this.companyDetails.effectiveDate);
    const previousRecordDate = this.getPreviousDateWithinMonths(currentRecordDate, [1, 2, 3, 4]);
    const previousEffectiveDate = this.getPreviousDateWithinMonths(new Date(currentEffectiveDate), [1, 2, 3, 4], false);
  
    this.previousRecordDate = previousRecordDate;
    this.previousEffectiveDate = previousEffectiveDate;
  
    this.nextRecordDate = this.getRandomDate(currentRecordDate, 120, 150);
    this.nextEffectiveDate = this.getRandomDate(currentEffectiveDate, 120, 150);
  }
  
  

  getRandomDate(referenceDate: Date, minOffset: number, maxOffset: number): string {
    const offset = Math.floor(Math.random() * (maxOffset - minOffset + 1) + minOffset);
    const newDate = new Date(referenceDate);
    newDate.setDate(referenceDate.getDate() + offset);
    return newDate.toISOString().split('T')[0]; 
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
    const recordDate = new Date(this.companyDetails?.recordDate);
    const effectiveDate = new Date(this.companyDetails?.effectiveDate);
  
    this.isCompleted = currentDate > effectiveDate;
    this.isUpcoming = currentDate < recordDate;
  
    // Set upcoming/completed to false if there are remaining days
    if (currentDate >= recordDate && currentDate < effectiveDate) {
      this.isCompleted = false;
      this.isUpcoming = false;
    }
  }

}
