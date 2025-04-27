import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AddConsolidationComponent } from './add-consolidation/add-consolidation.component';
import { Consolidation } from 'src/app/Model';


@Component({
  selector: 'app-consolidation',
  templateUrl: './consolidation.component.html',
  styleUrls: ['./consolidation.component.scss']
})
export class ConsolidationComponent implements OnInit {
  companies: Consolidation[] = [];
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private themeService: ThemeService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.getCompanies();
  }
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode() {
    return this.themeService.isDarkModeEnabled();
  }

  viewDetails(consolidation: Consolidation) {
    this.router.navigate(['/admin/consolidation', consolidation._id]);
  }

    
  addNewConsolidation() {
  const dialogRef = this.dialog.open(AddConsolidationComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getCompanies();
      }
    });
  }

    getCompanies() {
      this.apiService.get<Consolidation[]>('consolidations').subscribe({
        next: (res) => {
          this.companies = res;
        },
        error: (err) => {
          console.error('Failed to fetch companies:', err);
        }
      });
    }


  editConsolidation(consolidation: Consolidation, event: Event) {
   event.stopPropagation();
    const dialogRef = this.dialog.open(AddConsolidationComponent, {
      width: '800px',
      data: { consolidation }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getCompanies();
      }
    });
  }

  deleteConsolidation(consolidation: Consolidation, event: Event) {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete "${consolidation.companyName}"?`)) {
      this.apiService.delete(`consolidations/${consolidation._id}`).subscribe({
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
