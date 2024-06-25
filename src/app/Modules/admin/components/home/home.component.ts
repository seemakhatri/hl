import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usMarketStatus: string = '';
  ukMarketStatus: string = '';

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit(): void {
    this.updateMarketStatus();
    setInterval(() => {
      this.updateMarketStatus();
    }, 60000); // Update every minute
  }

  updateMarketStatus() {
    const now = new Date();

    // Check if it's a weekend
    const isWeekend = now.getUTCDay() === 0 || now.getUTCDay() === 6;

    if (isWeekend) {
      this.usMarketStatus = 'Closed';
      this.ukMarketStatus = 'Closed';
      return;
    }

    // US market times in UTC
    const usOpenTimeUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 14, 30)); // 9:30 AM ET => 14:30 UTC
    const usCloseTimeUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 21, 0)); // 4:00 PM ET => 21:00 UTC

    // UK market times in UTC
    const ukOpenTimeUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 8, 0)); // 8:00 AM GMT => 8:00 UTC
    const ukCloseTimeUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 16, 30)); // 4:30 PM GMT => 16:30 UTC

    // Determine market status based on current time and open/close times
    this.usMarketStatus = this.isMarketOpen(now, usOpenTimeUTC, usCloseTimeUTC) ? 'Open' : 'Closed';
    this.ukMarketStatus = this.isMarketOpen(now, ukOpenTimeUTC, ukCloseTimeUTC) ? 'Open' : 'Closed';
  }

  

  isMarketOpen(currentTime: Date, openTime: Date, closeTime: Date): boolean {
    return currentTime >= openTime && currentTime <= closeTime;
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode() {
    return this.themeService.isDarkModeEnabled();
  }

  navigateTo(path: string) {
    console.log(`Navigating to: /admin/${path}`);
    this.router.navigate([`/admin/${path}`]);
  }
  
}
