import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-consolidation-detail',
  templateUrl: './consolidation-detail.component.html',
  styleUrls: ['./consolidation-detail.component.scss']
})
export class ConsolidationDetailComponent implements OnInit {

  companyId: any;
  companyDetails: any;
  markerPosition: number | undefined;
  daysUntilPayment: number | undefined;
  isPrevious: boolean = false;
  isNext: boolean = false;


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
    this.calculateMarkerPosition();
  }

  loadCompanyDetails(id: string) {
    switch (id) {
      case '1':
        this.companyDetails = { id, name: 'Company A', description: 'Company A specializes in technology products.', recordDate: '2024-06-15', effectiveDate: '2024-06-30' };
        break;
      case '2':
        this.companyDetails = { id, name: 'Company B', description: 'Company B operates in the energy sector.', recordDate: '2024-04-20', effectiveDate: '2024-05-10' };
        break;
      case '3':
        this.companyDetails = { id, name: 'Company C', description: 'Company C is known for its healthcare services.', recordDate: '2024-06-10', effectiveDate: '2024-07-09' };
        break;
      case '4':
        this.companyDetails = { id, name: 'Company D', description: 'Company D focuses on consumer goods.', recordDate: '2024-06-01', effectiveDate: '2024-07-30' };
        break;
      case '5':
        this.companyDetails = { id, name: 'Company E', description: 'Company E provides financial services.', recordDate: '2024-06-01', effectiveDate: '2024-06-30' };
        break;
      default:
        this.companyDetails = null; 
    }

    this.calculateMarkerPosition();
  }

  calculateMarkerPosition() {
    if (!this.companyDetails) {
      this.markerPosition = 0;
      return;
    }
  
    const currentDate = new Date();
    const recordDate = new Date(this.companyDetails.recordDate);
    const effectiveDate = new Date(this.companyDetails.effectiveDate);
    
    const totalDuration = effectiveDate.getTime() - recordDate.getTime();
    const elapsedDuration = currentDate.getTime() - recordDate.getTime();
    
    const totalDays = Math.ceil(totalDuration / (1000 * 3600 * 24));
    const elapsedDays = Math.ceil(elapsedDuration / (1000 * 3600 * 24));
    
    const positionPercentage = (elapsedDays / totalDays) * 100;
    this.markerPosition = positionPercentage > 100 ? 100 : (positionPercentage < 0 ? 0 : positionPercentage);
  }


  formatDate(date: Date): string {
    return date.toLocaleDateString();
  }
  


  getRemainingDaysArray(): number[] {
    if (!this.companyDetails) {
        return [];
    }

    const currentDate = new Date();
    const effectiveDate = new Date(this.companyDetails.effectiveDate);
    const totalDuration = effectiveDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(totalDuration / (1000 * 3600 * 24)); 

    return Array.from({ length: remainingDays > 0 ? remainingDays : 0 }, (_, i) => i + 1);
  }



}
