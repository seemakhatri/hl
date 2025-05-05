import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { AddCategoryComponent } from '../add-category/add-category.component';



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
  userRole: string | null = null;
  constructor(
    private router: Router,
    private themeService: ThemeService,
    private http: HttpClient,
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
    this.createForm(); 
    this.updateMarketStatus();
    setInterval(() => {
      this.updateMarketStatus();
    }, 60000); // Update every minute
  }
  

  get isAdmin(): boolean {
    return this.authService.getRole() === 'admin';
  }


  createForm() {
    this.feedbackForm = this.fb.group({
      userName: ['', Validators.required],
      feedback: ['', Validators.required]
    });
  }

  get feedback() {
    return this.feedbackForm.get('feedback');
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      const userName = this.feedbackForm.value.userName;
      const feedback = this.feedbackForm.value.feedback;

      this.feedbackService.postFeedback(userName, feedback).subscribe(
        response => {
          console.log(response.message);
          this.toasterService.success('Feedback submitted successfully');
          this.feedbackForm.reset();
        },
        error => {
          console.error('Error submitting feedback:', error);
          this.toasterService.error('Error submitting feedback');
        }
      );
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
    const usMarketOpenTimeUK = new Date(ukTime.getFullYear(), ukTime.getMonth(), ukTime.getDate(), 14, 30); 
    const usMarketCloseTimeUK = new Date(ukTime.getFullYear(), ukTime.getMonth(), ukTime.getDate(), 21, 0); 
    const ukMarketOpenTimeUK = new Date(ukTime.getFullYear(), ukTime.getMonth(), ukTime.getDate(), 8, 0);
    const ukMarketCloseTimeUK = new Date(ukTime.getFullYear(), ukTime.getMonth(), ukTime.getDate(), 16, 30);

    // Determine market status based on current time and open/close times
    this.usMarketStatus = this.isMarketOpen(ukTime, usMarketOpenTimeUK, usMarketCloseTimeUK) ? 'Open' : 'Closed';
    this.ukMarketStatus = this.isMarketOpen(ukTime, ukMarketOpenTimeUK, ukMarketCloseTimeUK) ? 'Open' : 'Closed';
  
    console.log('US Market Status:', this.usMarketStatus);
    console.log('UK Market Status:', this.ukMarketStatus);
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
    this.router.navigate([`/admin/${path}`]);
  }
}
