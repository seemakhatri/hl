import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StockSplit } from 'src/app/Model';
import { ApiService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AddStockSplitComponent } from '../add-stock-split/add-stock-split.component';
import { ToasterService } from 'src/app/services/toaster.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-stock-split',
  templateUrl: './stock-split.component.html',
  styleUrls: ['./stock-split.component.scss']
})
export class StockSplitComponent implements OnInit {
  companies: StockSplit[] = [];
  userRole: string | null = null;
  isInCurrentMonth(date: Date): boolean {
    const today = new Date();
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }
  


  constructor(
    private http: HttpClient,
    private router: Router,
    private themeService: ThemeService,
    private apiService: ApiService,
    private dialog: MatDialog,
        private toast: ToasterService,
    private authService: AuthService
  ) {}

    ngOnInit(): void {
      this.userRole = localStorage.getItem('role');
      this.getCompanies();
    }

    get isAdmin(): boolean {
      return this.authService.getRole() === 'admin';
    }

    
    getCompanies() {
      this.apiService.get<StockSplit[]>('stock-splits').subscribe({
        next: (stockSplits) => {
          const today = new Date();
          const companiesMap: { [key: string]: StockSplit } = {};
    
          stockSplits.forEach((stockSplit) => {
            const recordDate = new Date(stockSplit.recordDate);
    
            if (!companiesMap[stockSplit.companyName]) {
              companiesMap[stockSplit.companyName] = stockSplit;
            }
    
            // Prefer a stock split whose recordDate is in the current month and year
            if (
              recordDate.getMonth() === today.getMonth() &&
              recordDate.getFullYear() === today.getFullYear()
            ) {
              companiesMap[stockSplit.companyName] = stockSplit;
            }
          });
    
          this.companies = Object.values(companiesMap);
        },
        error: (error) => {
          this.toast.error('Failed to fetch stock splits', 'Error');
          console.error('Error fetching stock splits:', error);
        }
      });
    }
    


  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode() {
    return this.themeService.isDarkModeEnabled();
  }

    isCurrentMonth(stockSplit: StockSplit): boolean {
      const today = new Date();
      const exDate = new Date(stockSplit.recordDate);
      return exDate.getMonth() === today.getMonth() && exDate.getFullYear() === today.getFullYear();
    }


    viewDetails(stockSplit: StockSplit, index: number) {
      this.apiService.currentTabIndex = index
      this.router.navigate(['/admin/stock-split', stockSplit._id]);
    }
  

  private filterCompanies() {
    const today = new Date();
    // this.filteredCompanies = this.companies.filter(company => company.recordDate <= today);
  }


  addNewStockSplit() {
      const dialogRef = this.dialog.open(AddStockSplitComponent, {
        width: '800px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'refresh') {
          this.getCompanies();
        }
      });
    }

  editDividend(stockSplit: StockSplit, event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AddStockSplitComponent, {
      width: '800px',
      data: { stockSplit }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getCompanies();
      }
    });
  }
  
  deleteDividend(stockSplit: StockSplit, event: Event) {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete "${stockSplit.companyName}"?`)) {
      this.apiService.delete(`stock-splits/${stockSplit._id}`).subscribe({
        next: () => {
          this.toast.success('Stock Split Deleted successfully', 'Success');
          this.getCompanies(); 
        },
        error: (err) => {
          console.error('Error deleting dividend:', err);
        }
      });
    }
  }

}
