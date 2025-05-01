import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Dividend } from 'src/app/Model';
import { ApiService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-dividend-detail',
  templateUrl: './dividend-detail.component.html',
  styleUrls: ['./dividend-detail.component.scss']
})
export class DividendDetailComponent implements OnInit {
  trackPosition: number = 0; 
  exDate: Date = new Date(); 
  paymentDate: Date = new Date();
  currentDate: Date = new Date();
  daysLeft: number = 0;
  totalDays: number = 0;
  numberOfShares: number = 0;
finalAmount: number = 0;


  companyId: any;
  companies: Dividend[] = []; 
  currentCompanyIndex: number = 0;
  companyDetails: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService,
    private apiService: ApiService,
        private toast: ToasterService,
  ) {}

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode() {
    return this.themeService.isDarkModeEnabled();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const companyId = params.get('id');
      if (companyId && companyId !== this.companyId) {
        this.companyId = companyId;
        this.fetchAndSetCompanies();
      }
    });
  }
  
  

  fetchAndSetCompanies() {
    this.apiService.get<Dividend[]>('dividends').subscribe({
      next: (res) => {
        console.log('Fetched companies:', res);
        this.companies = res;
        this.companies = res.sort((a, b) => new Date(a.exDate).getTime() - new Date(b.exDate).getTime());
  
        const index = this.companies.findIndex(c => c._id === this.companyId);
        this.currentCompanyIndex = index !== -1 ? index : 0;
  
        this.companyDetails = this.companies[this.currentCompanyIndex];
        this.apiService.allCardItems = this.companies;
  
        this.exDate = new Date(this.companyDetails.exDate);
        this.paymentDate = new Date(this.companyDetails.paymentDate);
        this.currentDate = new Date(); 
  
        this.calculateTrackPosition();
      },
      error: (err) => {
        console.error('Failed to fetch companies:', err);
      }
    });
  }
  
  calculateFinalAmount() {
    if (this.numberOfShares && this.companyDetails?.withholdingTax && this.companyDetails?.dividendAmount) {
      const dividendAmount = this.companyDetails.dividendAmount;
      const taxRate = this.companyDetails.withholdingTax;
  
      const totalDividend = this.numberOfShares * dividendAmount; // First multiply shares × dividendAmount
      const taxDeduction = (totalDividend * taxRate) / 100; // Then calculate tax on that totalDividend
  
      this.finalAmount = taxDeduction; // Show the tax amount
    } else {
      this.finalAmount = 0;
    }
  }
  

  calculateTrackPosition() {
    const exTime = this.exDate.getTime();
    const payTime = this.paymentDate.getTime();
    const todayTime = this.currentDate.getTime();

    this.totalDays = Math.ceil((payTime - exTime) / (1000 * 60 * 60 * 24));
    this.daysLeft = Math.max(0, Math.ceil((payTime - todayTime) / (1000 * 60 * 60 * 24)));

    const progress = Math.min(1, Math.max(0, (todayTime - exTime) / (payTime - exTime)));
    this.trackPosition = progress * 100;
  }

  moveForward() {
    const currentCompanyName = this.companyDetails?.companyName;
    const currentExDate = new Date(this.companyDetails?.exDate).getTime();
  
    // Filter dividends of the same company
    const sameCompanyDividends = this.companies
      .filter(c => c.companyName === currentCompanyName)
      .sort((a, b) => new Date(a.exDate).getTime() - new Date(b.exDate).getTime());
  
    // Find current index inside filtered list
    const currentIndex = sameCompanyDividends.findIndex(c => new Date(c.exDate).getTime() === currentExDate);
  
    if (currentIndex < sameCompanyDividends.length - 1) {
      // Move to next
      this.companyDetails = sameCompanyDividends[currentIndex + 1];
  
      // Also update track
      this.exDate = new Date(this.companyDetails.exDate);
      this.paymentDate = new Date(this.companyDetails.paymentDate);
      this.calculateTrackPosition();
    } else {
      this.toast.info('No more future dividends for this company.', 'Info');
    }
  }
  
  moveBack() {
    const currentCompanyName = this.companyDetails?.companyName;
    const currentExDate = new Date(this.companyDetails?.exDate).getTime();
  
    // Filter dividends of the same company
    const sameCompanyDividends = this.companies
      .filter(c => c.companyName === currentCompanyName)
      .sort((a, b) => new Date(a.exDate).getTime() - new Date(b.exDate).getTime());
  
    // Find current index inside filtered list
    const currentIndex = sameCompanyDividends.findIndex(c => new Date(c.exDate).getTime() === currentExDate);
  
    if (currentIndex > 0) {
      // Move to previous
      this.companyDetails = sameCompanyDividends[currentIndex - 1];
  
      // Also update track
      this.exDate = new Date(this.companyDetails.exDate);
      this.paymentDate = new Date(this.companyDetails.paymentDate);
      this.calculateTrackPosition();
    } else {
      this.toast.info('No more previous dividends for this company.', 'Info');
    }
  }
  
  
  
}
