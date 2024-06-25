import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usMarketStatus: string = '';
  ukMarketStatus: string = '';
  tomorrowUsMarketStatus: string = '';
  tomorrowUkMarketStatus: string = '';
  usMarketOpenTomorrow: boolean = false; 
  ukMarketOpenTomorrow: boolean = false; 
  marketTomorrowMessage: string = '';
  feedbackForm!: FormGroup;

  constructor(private router: Router,
     private themeService: ThemeService,
      private http: HttpClient,
       private fb: FormBuilder,
       private toasterService: ToasterService,
      ) {}

      ngOnInit(): void {
        this.createForm(); 
        this.updateMarketStatus();
        this.updateTomorrowMarketStatus();
        setInterval(() => {
          this.updateMarketStatus();
          this.updateTomorrowMarketStatus();
        }, 60000); // Update every minute
      }
      
  createForm() {
    this.feedbackForm = this.fb.group({
      feedback: ['', Validators.required]
    });
  }

  get feedback() {
    return this.feedbackForm.get('feedback');
  }


  

  onSubmit() {
    if (this.feedbackForm.valid) {
      this.http.post('https://hl-backend-r8qx.onrender.com/api/feedback', this.feedbackForm.value)

        .subscribe(
          (response) => {
            this.toasterService.success('Feedback sent successfully!', 'Success');
            console.log('Inquiry sent successfully:', response);
            this.feedbackForm.reset();
          },
          (error) => {
            console.error('Error sending Feedback', error);
          }
        );
    } else {
      this.feedbackForm.markAllAsTouched();
    }
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

    // US market times in GMT
    const usOpenTimeGMT = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 13, 30)); // 9:30 AM ET => 13:30 GMT
    const usCloseTimeGMT = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 20, 0)); // 4:00 PM ET => 20:00 GMT

    // UK market times in GMT
    const ukOpenTimeGMT = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 8, 0)); // 8:00 AM GMT => 8:00 GMT
    const ukCloseTimeGMT = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 16, 30)); // 4:30 PM GMT => 16:30 GMT

    // Determine market status based on current time and open/close times
    this.usMarketStatus = this.isMarketOpen(now, usOpenTimeGMT, usCloseTimeGMT) ? 'Open' : 'Closed';
    this.ukMarketStatus = this.isMarketOpen(now, ukOpenTimeGMT, ukCloseTimeGMT) ? 'Open' : 'Closed';
  }

  updateTomorrowMarketStatus() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getUTCDate() + 1);

    // US market times for tomorrow in GMT
    const tomorrowUsOpenTimeGMT = new Date(Date.UTC(tomorrow.getUTCFullYear(), tomorrow.getUTCMonth(), tomorrow.getUTCDate(), 13, 30)); // US market opens tomorrow
    const tomorrowUsCloseTimeGMT = new Date(Date.UTC(tomorrow.getUTCFullYear(), tomorrow.getUTCMonth(), tomorrow.getUTCDate(), 20, 0)); // US market closes tomorrow

    // UK market times for tomorrow in GMT
    const tomorrowUkOpenTimeGMT = new Date(Date.UTC(tomorrow.getUTCFullYear(), tomorrow.getUTCMonth(), tomorrow.getUTCDate(), 8, 0)); // UK market opens tomorrow
    const tomorrowUkCloseTimeGMT = new Date(Date.UTC(tomorrow.getUTCFullYear(), tomorrow.getUTCMonth(), tomorrow.getUTCDate(), 16, 30)); // UK market closes tomorrow

    // Determine tomorrow's market status
    this.usMarketOpenTomorrow = this.isMarketOpen(now, tomorrowUsOpenTimeGMT, tomorrowUsCloseTimeGMT);
    this.ukMarketOpenTomorrow = this.isMarketOpen(now, tomorrowUkOpenTimeGMT, tomorrowUkCloseTimeGMT);

    // Set status strings for display
    this.tomorrowUsMarketStatus = this.usMarketOpenTomorrow ? 'Open' : 'Closed';
    this.tomorrowUkMarketStatus = this.ukMarketOpenTomorrow ? 'Open' : 'Closed';

    // Set market tomorrow message
    if (this.usMarketOpenTomorrow && this.ukMarketOpenTomorrow) {
      this.marketTomorrowMessage = 'The US and UK markets will remain open tomorrow.';
    } else if (this.usMarketOpenTomorrow && !this.ukMarketOpenTomorrow) {
      this.marketTomorrowMessage = 'The US market will remain open tomorrow, but the UK market will be closed.';
    } else if (!this.usMarketOpenTomorrow && this.ukMarketOpenTomorrow) {
      this.marketTomorrowMessage = 'The UK market will remain open tomorrow, but the US market will be closed.';
    } else {
      this.marketTomorrowMessage = 'Both the US and UK markets will be closed tomorrow.';
    }
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
