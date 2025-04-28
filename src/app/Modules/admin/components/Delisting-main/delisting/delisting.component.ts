import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Delisting } from 'src/app/Model';
import { ApiService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AddDelistingComponent } from '../add-delisting/add-delisting.component';
import { AuthService } from 'src/app/services/auth.service';

interface Company {
  id: string;
  name: string;
  descriptionDate: Date;
  exDividendDate: Date;
  paymentDate: Date;
}

@Component({
  selector: 'app-delisting',
  templateUrl: './delisting.component.html',
  styleUrls: ['./delisting.component.scss']
})
export class DelistingComponent {
  companies: Delisting[] = [];
  userRole: string | null = null;


  constructor(
    private http: HttpClient,
    private router: Router,
    private themeService: ThemeService,
    private apiService: ApiService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
    this.getCompanies();
  }


  get isAdmin(): boolean {
    return this.authService.getRole() === 'admin';
  }


  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode() {
    return this.themeService.isDarkModeEnabled();
  }

  viewDetails(delisting: Delisting) {
    this.router.navigate(['/admin/delisting', delisting._id]);
  }


    getCompanies() {
      this.apiService.get<Delisting[]>('delistings').subscribe({
        next: (res) => {
          this.companies = res;
        },
        error: (err) => {
          console.error('Failed to fetch companies:', err);
        }
      });
    }



  addNewDelisting() {
  const dialogRef = this.dialog.open(AddDelistingComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getCompanies();
      }
    });
  }
  editDelisting(delisting: Delisting, event: Event) {
  event.stopPropagation();
    const dialogRef = this.dialog.open(AddDelistingComponent, {
      width: '800px',
      data: { delisting }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getCompanies();
      }
    });
  }

  deleteDelisting(delisting: Delisting, event: Event) {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete "${delisting.companyName}"?`)) {
      this.apiService.delete(`delistings/${delisting._id}`).subscribe({
        next: () => {
          this.getCompanies(); 
        },
        error: (err) => {
          console.error('Error deleting dividend:', err);
        }
      });
    }
  }

}
