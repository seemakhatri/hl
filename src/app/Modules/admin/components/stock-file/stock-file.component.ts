import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'src/app/services/toaster.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StockFile } from 'src/app/Model';

@Component({
  selector: 'app-stock-file',
  templateUrl: './stock-file.component.html',
  styleUrls: ['./stock-file.component.scss']
})
export class StockFileComponent implements OnInit {
    stockFile: StockFile = new StockFile('', '', '');
    isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toast: ToasterService,
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,

  ) { }

  ngOnInit(): void {

  }


  get isAdmin(): boolean {
    return this.authService.getRole() === 'admin';
  }


  onSubmit() {
    const endpoint = 'stock-files';
    
    this.apiService.post(endpoint, this.stockFile).subscribe(
      () => {
        this.toast.success('Stock file submitted successfully for approval.', 'Success');

        this.stockFile = new StockFile('', '', '');
      },
      error => {
        this.toast.error('Failed to submit the Stock file. Please try again.', 'Error');
      }
    );
  }
  


  viewPending() {
    this.router.navigate(['/admin/pending-stock-file']);
  }

}
