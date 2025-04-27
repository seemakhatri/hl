import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockSplit } from 'src/app/Model';
import { ApiService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-stock-split-detail',
  templateUrl: './stock-split-detail.component.html',
  styleUrls: ['./stock-split-detail.component.scss'],
})
export class StockSplitDetailComponent implements OnInit {
  trackPosition: number = 0;
  daysLeft: number = 0;
  totalDays: number = 0;
  recordDate: Date = new Date();
  effectiveDate: Date = new Date();

  companyId: any;
  companies: StockSplit[] = []; 
  companyDetails: any;
  currentDate: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private apiService: ApiService
  ) {}

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode() {
    return this.themeService.isDarkModeEnabled();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const companyId = params.get('id');
      if (companyId && companyId !== this.companyId) {
        this.companyId = companyId;
        this.fetchAndSetCompanies();
      }
    });
  }


  fetchAndSetCompanies() {
    this.apiService.get<StockSplit[]>('stock-splits').subscribe({
      next: (res) => {
        this.companies = res;
        this.companies = res.sort((a, b) => new Date(a.recordDate).getTime() - new Date(b.effectiveDate).getTime());
        const index = this.companies.findIndex(c => c._id === this.companyId);
        if (index !== -1) {
          this.companyDetails = this.companies[index];
          this.recordDate = new Date(this.companyDetails?.recordDate);
          this.effectiveDate = new Date(this.companyDetails?.effectiveDate);
          this.currentDate = new Date();
        } else {
          console.warn('Company with ID not found:', this.companyId);
        }
  
        this.calculateTrackPosition();
        console.log('Track position calculated.');
      },
      error: (err) => {
        console.error('Failed to fetch companies:', err);
      }
    });
  }
  

  calculateTrackPosition() {
    const exTime = this.recordDate.getTime();
    const payTime = this.effectiveDate.getTime();
    const todayTime = this.currentDate.getTime();

    this.totalDays = Math.ceil((payTime - exTime) / (1000 * 60 * 60 * 24));
    this.daysLeft = Math.max(
      0,
      Math.ceil((payTime - todayTime) / (1000 * 60 * 60 * 24))
    );

    const progress = Math.min(
      1,
      Math.max(0, (todayTime - exTime) / (payTime - exTime))
    );
    this.trackPosition = progress * 100;
  }
}
