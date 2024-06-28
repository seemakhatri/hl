import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ThemeService } from 'src/app/services/theme.service';

export interface Feedback {
  _id: string;
  feedback: string;
  userName: string; 
  timestamp: Date;
}


@Component({
  selector: 'app-view-feedbacks',
  templateUrl: './view-feedbacks.component.html',
  styleUrls: ['./view-feedbacks.component.scss']
})
export class ViewFeedbacksComponent implements OnInit {
  feedbacks: Feedback[] = [];
  loading: boolean = false; 
  constructor(
    private feedbackService: FeedbackService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.loading = true; // Show loading indicator
    this.feedbackService.getFeedbacks().subscribe(
      data => {
        this.feedbacks = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching feedbacks:', error);
        this.loading = false; 
      }
    );
  }
  deleteFeedback(id: string) {
    this.feedbackService.deleteFeedback(id).subscribe(
      () => {
        this.feedbacks = this.feedbacks.filter(feedback => feedback._id !== id);
      },
      error => {
        console.error('Error deleting feedback:', error);
      }
    );
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode() {
    return this.themeService.isDarkModeEnabled();
  }
}
