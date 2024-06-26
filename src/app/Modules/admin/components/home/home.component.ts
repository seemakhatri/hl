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
  usMarketTomorrowMessage: string = '';
  ukMarketTomorrowMessage: string = '';
  feedbackForm!: FormGroup;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private http: HttpClient,
    private fb: FormBuilder,
    private toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    this.createForm(); 
    this.updateMarketStatus();
    setInterval(() => {
      this.updateMarketStatus();
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
    const ukTimeString = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(now);
    
    const [date, time] = ukTimeString.split(', ');
    const [day, month, year] = date.split('/').map(Number);
    const [hours, minutes, seconds] = time.split(':').map(Number);
    
    const ukTime = new Date(year, month - 1, day, hours, minutes, seconds);
  
    console.log('Current UK Time:', ukTime);
  
    // Check if it's a weekend
    const isWeekend = ukTime.getDay() === 0 || ukTime.getDay() === 6;
  
    if (isWeekend) {
      this.usMarketStatus = 'Closed';
      this.ukMarketStatus = 'Closed';
      this.usMarketTomorrowMessage = 'The US market will be closed tomorrow.';
      this.ukMarketTomorrowMessage = 'The UK market will be closed tomorrow.';
      return;
    }
  
    // Market times in local UK time
    const usMarketOpenTimeUK = new Date(ukTime.getFullYear(), ukTime.getMonth(), ukTime.getDate(), 14, 30); // 2:30 PM UK time
    const usMarketCloseTimeUK = new Date(ukTime.getFullYear(), ukTime.getMonth(), ukTime.getDate(), 21, 0); // 9:00 PM UK time
    const ukMarketOpenTimeUK = new Date(ukTime.getFullYear(), ukTime.getMonth(), ukTime.getDate(), 8, 0); // 8:00 AM UK time
    const ukMarketCloseTimeUK = new Date(ukTime.getFullYear(), ukTime.getMonth(), ukTime.getDate(), 16, 30); // 4:30 PM UK time
  
    console.log('US Market Open Time (UK):', usMarketOpenTimeUK);
    console.log('US Market Close Time (UK):', usMarketCloseTimeUK);
    console.log('UK Market Open Time:', ukMarketOpenTimeUK);
    console.log('UK Market Close Time:', ukMarketCloseTimeUK);
  
    // Determine market status based on current time and open/close times
    this.usMarketStatus = this.isMarketOpen(ukTime, usMarketOpenTimeUK, usMarketCloseTimeUK) ? 'Open' : 'Closed';
    this.ukMarketStatus = this.isMarketOpen(ukTime, ukMarketOpenTimeUK, ukMarketCloseTimeUK) ? 'Open' : 'Closed';
  
    console.log('US Market Status:', this.usMarketStatus);
    console.log('UK Market Status:', this.ukMarketStatus);
  
    this.updateTomorrowMarketStatus();
  }
  
  isMarketOpen(currentTime: Date, openTime: Date, closeTime: Date): boolean {
    return currentTime >= openTime && currentTime <= closeTime;
  }



  updateTomorrowMarketStatus() {
    const now = new Date();
    const ukTimeString = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(now);
  
    const [date, time] = ukTimeString.split(', ');
    const [day, month, year] = date.split('/').map(Number);
    const [hours, minutes, seconds] = time.split(':').map(Number);
    
    const ukTime = new Date(year, month - 1, day, hours, minutes, seconds);
    const tomorrow = new Date(ukTime);
    tomorrow.setDate(ukTime.getDate() + 1);
  
    // Check if tomorrow is a weekend
    const isWeekendTomorrow = tomorrow.getDay() === 0 || tomorrow.getDay() === 6;
  
    if (isWeekendTomorrow) {
      this.usMarketTomorrowMessage = 'Closed';
      this.ukMarketTomorrowMessage = 'Closed';
    } else {
      this.usMarketTomorrowMessage = 'Open';
      this.ukMarketTomorrowMessage = 'Open';
    }
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
