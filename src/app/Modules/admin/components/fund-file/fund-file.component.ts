import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-fund-file',
  templateUrl: './fund-file.component.html',
  styleUrls: ['./fund-file.component.scss']
})
export class FundFileComponent implements OnInit {
  fundForm!: FormGroup;
  existingData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toasterService: ToasterService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.fundForm = this.fb.group({
      fundName: ['', Validators.required],
      isin: ['', Validators.required],
      sedolOrTicker: ['', Validators.required]
    });

    this.existingData = this.dataService.getExistingData();
  }

  isDuplicateEntry(formData: any): boolean {
    return this.existingData.some(data =>
      data.ISIN === formData.isin ||
      data.SEDOL === formData.sedolOrTicker ||
      data.Ticker === formData.sedolOrTicker
    );
  }

  onSubmit() {
    if (this.fundForm.valid) {
      const formData = {
        type: 'fund',
        fundName: this.fundForm.value.fundName,
        isin: this.fundForm.value.isin,
        sedolOrTicker: this.fundForm.value.sedolOrTicker
      };

      if (this.isDuplicateEntry(formData)) {
        this.toasterService.error(' Unfortunately, this fund is not eligible on HL Platform', 'Rejection');
        return;
      }
     

      this.http.post('https://hl-backend-r8qx.onrender.com/api/inquiries', formData)
        .subscribe(
          (response) => {
            this.toasterService.success('Inquiry sent successfully!', 'Success');
            console.log('Inquiry sent successfully:', response);
            this.fundForm.reset();
          },
          (error) => {
            console.error('Error sending inquiry', error);
          }
        );
    } else {
      this.fundForm.markAllAsTouched();
    }
  }
}
