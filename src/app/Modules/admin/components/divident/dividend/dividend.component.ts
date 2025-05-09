import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Company, Dividend } from 'src/app/Model';
import { ApiService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AddDividentComponent } from '../add-divident/add-divident.component';
import { ToasterService } from 'src/app/services/toaster.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dividend',
  templateUrl: './dividend.component.html',
  styleUrls: ['./dividend.component.scss'],
})
export class DividendComponent implements OnInit {
  companies: Dividend[] = [];
  userRole: string | null = null;


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
  isHighlighted(dividend: Dividend): boolean {
    const today = new Date();
    const exDate = new Date(dividend.exDate);
    const paymentDate = new Date(dividend.paymentDate);
  
    const isCurrentMonth = (date: Date) =>
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  
    return isCurrentMonth(exDate) || isCurrentMonth(paymentDate);
  }
  
  
  

  getCompanies() {
    this.apiService.get<Dividend[]>('dividends').subscribe(
      (dividends) => {
        const today = new Date();
        const companiesMap: { [key: string]: Dividend } = {};
  
        dividends.forEach((dividend) => {
          const exDate = new Date(dividend.exDate);
  
          if (!companiesMap[dividend.companyName]) {
            companiesMap[dividend.companyName] = dividend;
          }
  
          // Prefer a dividend that matches the current month and year
          if (
            exDate.getMonth() === today.getMonth() &&
            exDate.getFullYear() === today.getFullYear()
          ) {
            companiesMap[dividend.companyName] = dividend;
          }
        });
  
        this.companies = Object.values(companiesMap);
      },
      (error) => {
        this.toast.error('Failed to fetch dividends', 'Error');
        console.error('Error fetching dividends:', error);
      }
    );
  }
  

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode() {
    return this.themeService.isDarkModeEnabled();
  }

  viewDetails(divident: Dividend, index: number) {
    this.apiService.currentTabIndex = index
    this.router.navigate(['/admin/dividend-detail', divident._id]);
  }

  addNewDividend() {
    const dialogRef = this.dialog.open(AddDividentComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getCompanies();
      }
    });
  }

  editDividend(dividend: Dividend, event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AddDividentComponent, {
      width: '800px',
      data: { dividend }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getCompanies();
      }
    });
  }
  
  deleteDividend(dividend: Dividend, event: Event) {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete "${dividend.companyName}"?`)) {
      this.apiService.delete(`dividends/${dividend._id}`).subscribe({
        next: () => {
          this.getCompanies();
          this.toast.success('Dividend deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting dividend:', err);
          this.toast.error('Failed to delete dividend. Please try again.');
        }
      });
    }
  }
  
  
}
