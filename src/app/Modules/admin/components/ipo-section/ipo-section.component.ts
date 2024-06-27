import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

interface IPO {
  id: string;
  companyName: string;
  date: Date;
  description: string;
  priceRange: string;
  exchange: string;
}

@Component({
  selector: 'app-ipo-section',
  templateUrl: './ipo-section.component.html',
  styleUrls: ['./ipo-section.component.scss']
})
export class IpoSectionComponent {

  constructor(
    private themeService: ThemeService,
    private router: Router
  ) {}



  upcomingIPOs: IPO[] = [
    {
      id: '1',
      companyName: 'Tech Innovators Inc.',
      date: new Date('2024-07-01'),
      description: 'A leading tech company specializing in AI.',
      priceRange: '$15-$20',
      exchange: 'NASDAQ'
    },
    {
      id: '2',
      companyName: 'Green Earth Foods',
      date: new Date('2024-08-05'),
      description: 'A sustainable food production company.',
      priceRange: '$25-$30',
      exchange: 'NYSE'
    },
    {
      id: '3',
      companyName: 'Urban Style Co.',
      date: new Date('2024-09-10'),
      description: 'A trendy urban clothing retailer.',
      priceRange: '$10-$15',
      exchange: 'NASDAQ'
    },
    {
      id: '4',
      companyName: 'HealthFirst Medical',
      date: new Date('2024-10-15'),
      description: 'A healthcare com. offering medical solutions.',
      priceRange: '$30-$35',
      exchange: 'NYSE'
    },
    {
      id: '5',
      companyName: 'SmartHome Solutions',
      date: new Date('2024-11-20'),
      description: 'A company providing smart home devices.',
      priceRange: '$20-$25',
      exchange: 'NASDAQ'
    },
    {
      id: '6',
      companyName: 'Global Logistics Ltd.',
      date: new Date('2024-12-25'),
      description: 'A leader in international logistics.',
      priceRange: '$40-$45',
      exchange: 'NYSE'
    }
  ];
  

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode() {
    return this.themeService.isDarkModeEnabled();
  }



  viewDetails(ipo: IPO) {
    this.router.navigate(['/admin/ipo-section', ipo.id]);
  }

}
