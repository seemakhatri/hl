import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-stock-file',
  templateUrl: './stock-file.component.html',
  styleUrls: ['./stock-file.component.scss']
})
export class StockFileComponent implements OnInit {
  stockForm!: FormGroup;
  existingData: any[] = [];


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toasterService: ToasterService,
  ) { }

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      stockName: ['', Validators.required],
      isin: ['', Validators.required],
      sedolOrTicker: ['', Validators.required]
    });

    // this.existingData = this.dataService.getExistingData();
  }

  isDuplicateEntry(formData: any): boolean {
    return this.existingData.some(data =>
      data.ISIN === formData.isin ||
      data.SEDOL === formData.sedolOrTicker ||
      data.Ticker === formData.sedolOrTicker
    );
  }


  onSubmit() {
    if (this.stockForm.valid) {
      const formData = {
        type: 'stock',
        stockName: this.stockForm.value.stockName,
        isin: this.stockForm.value.isin,
        sedolOrTicker: this.stockForm.value.sedolOrTicker
      };

      if (this.isDuplicateEntry(formData)) {
        this.toasterService.error(' Unfortunately, this share/equity is not eligible on HL Platform', 'Rejection');
        return;
      }

      this.http.post('https://hl-backend-r8qx.onrender.com/api/inquiries', formData)
        .subscribe(
          (response) => {
            this.toasterService.success('Inquiry sent successfully!', 'Success');
            console.log('Inquiry sent successfully:', response);
            this.stockForm.reset();
          },
          (error) => {
            console.error('Error sending inquiry', error);
          }
        );
    } else {
      this.stockForm.markAllAsTouched();
    }
  }

}
