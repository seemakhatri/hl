import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

interface Company {
  id: string;
  name: string;
  descriptionDate: Date;
  exDividendDate: Date;
  paymentDate: Date;
}

@Component({
  selector: 'app-dividend',
  templateUrl: './dividend.component.html',
  styleUrls: ['./dividend.component.scss']
})
export class DividendComponent {
  companies: Company[] = [
    { id: '1', name: 'Company A', descriptionDate: new Date('2024-04-05'), exDividendDate: new Date('2024-03-20'), paymentDate: new Date('2024-04-5') },
    { id: '2', name: 'Company B',  descriptionDate: new Date('2024-06-30'),  exDividendDate: new Date('2024-06-01'), paymentDate: new Date('2024-07-05')   },
    { id: '3', name: 'Company C', descriptionDate: new Date('2024-05-10'),  exDividendDate: new Date('2024-04-20'), paymentDate: new Date('2024-05-10')},
    { id: '4', name: 'Company D', descriptionDate: new Date('2024-09-30'), exDividendDate: new Date('2024-09-01'), paymentDate: new Date('2024-05-30') },
    { id: '5', name: 'Company E', descriptionDate: new Date('2024-10-01'), exDividendDate: new Date('2024-10-01'), paymentDate: new Date('2024-10-20') }
  ];

 




  filteredCompanies: Company[] = [];
  isInCurrentMonth(date: Date): boolean {
    const today = new Date();
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }
  


  constructor(private router: Router, private themeService: ThemeService) {
    this.filterCompanies();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode() {
    return this.themeService.isDarkModeEnabled();
  }

  viewDetails(company: Company) {
    this.router.navigate(['/admin/dividend', company.id]);
  }

  private filterCompanies() {
    const today = new Date();
    this.filteredCompanies = this.companies.filter(company => company.exDividendDate <= today);
  }
}
