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
  selector: 'app-delisting',
  templateUrl: './delisting.component.html',
  styleUrls: ['./delisting.component.scss']
})
export class DelistingComponent {

  companies: Company[] = [
    { id: '1', name: 'Company A', descriptionDate: new Date('2024-04-10') , exDividendDate: new Date('2024-05-10'), paymentDate: new Date('2024-05-30') },
    { id: '2', name: 'Company B', descriptionDate: new Date('2024-05-15') , exDividendDate: new Date('2024-05-15'), paymentDate: new Date('2024-06-05') },
    { id: '3', name: 'Company C', descriptionDate: new Date('2024-06-01') , exDividendDate: new Date('2024-06-01'), paymentDate: new Date('2024-06-20') },
    { id: '4', name: 'Company D', descriptionDate: new Date('2024-07-10') , exDividendDate: new Date('2024-06-10'), paymentDate: new Date('2024-06-30') },
    { id: '5', name: 'Company E', descriptionDate: new Date('2024-08-25') , exDividendDate: new Date('2024-04-25'), paymentDate: new Date('2024-05-15') }
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
    this.router.navigate(['/admin/delisting', company.id]);
  }

  private filterCompanies() {
    const today = new Date();
    this.filteredCompanies = this.companies.filter(company => company.exDividendDate <= today);
  }

}
