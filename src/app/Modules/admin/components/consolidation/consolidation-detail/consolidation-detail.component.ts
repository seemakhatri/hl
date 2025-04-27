import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consolidation } from 'src/app/Model';
import { ApiService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-consolidation-detail',
  templateUrl: './consolidation-detail.component.html',
  styleUrls: ['./consolidation-detail.component.scss']
})
export class ConsolidationDetailComponent implements OnInit {

  companyId: any;
  companies: Consolidation[] = []; 
  companyDetails: any;
  recordDate: Date = new Date();
  effectiveDate: Date = new Date();
  currentDate: Date = new Date();

  constructor(private route: ActivatedRoute,
     private themeService: ThemeService,
    private apiService: ApiService) {}

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
      this.apiService.get<Consolidation[]>('consolidations').subscribe({
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
        },
        error: (err) => {
          console.error('Failed to fetch companies:', err);
        }
      });
    }
    




}
