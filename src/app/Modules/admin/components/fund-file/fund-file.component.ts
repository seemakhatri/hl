import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FundFile } from 'src/app/Model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-fund-file',
  templateUrl: './fund-file.component.html',
  styleUrls: ['./fund-file.component.scss']
})
export class FundFileComponent implements OnInit {
    fundFile: FundFile = new FundFile('', '', '');
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
    const endpoint = 'fund-files';
    
    this.apiService.post(endpoint, this.fundFile).subscribe(
      () => {
        this.toast.success('Fund file submitted successfully for approval.', 'Success');
        this.fundFile = new FundFile('', '', '');
      },
      error => {
        this.toast.error('Failed to submit the fund file. Please try again.', 'Error');
        console.error('Error adding consolidation:', error);
      }
    );
  }
  


  viewPending() {
    this.router.navigate(['/admin/pending-fund-file']);
  }
}
