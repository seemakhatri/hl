import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dividend } from 'src/app/Model';
import { ApiService } from 'src/app/services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-divident',
  templateUrl: './add-divident.component.html',
  styleUrls: ['./add-divident.component.scss'],
})
export class AddDividentComponent implements OnInit {
  dividend: Dividend = new Dividend('', '', '', '');
  dividendList: Dividend[] = [];

  isEditMode: boolean = false;
  isAddingNew: boolean = false;
  isOverseas: boolean = false;
  currentFormIndex: number = 0;
  fixedCompanyName: string = '';

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AddDividentComponent>,
    private toast: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: { dividend: Dividend } | null
  ) {}

  ngOnInit() {
    if (this.data?.dividend) {
      const loadedDividend = {
        ...this.data.dividend,
        exDate: this.formatDate(this.data.dividend.exDate),
        paymentDate: this.formatDate(this.data.dividend.paymentDate),
      };
      this.dividendList = [loadedDividend];
      this.dividend = loadedDividend;
      this.fixedCompanyName = loadedDividend.companyName;
      this.isOverseas = loadedDividend.withholdingTax !== undefined;
      this.isEditMode = true;
    } else {
      this.dividendList = [this.dividend];
    }
  }
  
  formatDate(dateStr: string | Date): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    const endpoint = 'dividends';
    const currentDividend = this.dividendList[this.currentFormIndex];
  
    if (!this.isOverseas) {
      delete currentDividend.withholdingTax;
    }
  
    if (this.isEditMode && currentDividend._id && !this.isAddingNew) {
      console.log('Updating existing dividend:', currentDividend);
      this.apiService.put(`${endpoint}/${currentDividend._id}`, currentDividend).subscribe(
        () => {
          this.toast.success('Dividend updated successfully', 'Success');
          this.dialogRef.close('refresh');
        },
        (error) => this.handleError('updating', error)
      );
    } else {
      // Case 2: Adding new dividend
      console.log('Adding new dividend:', currentDividend);
      this.apiService.post(endpoint, currentDividend).subscribe(
        () => {
          this.toast.success('Dividend added successfully', 'Success');
          this.dialogRef.close('refresh');
        },
        (error) => this.handleError('adding', error)
      );
    }
  }
  

  onNext() {
    const newDividend = new Dividend(this.fixedCompanyName, '', '', '');
    this.dividendList.push(newDividend);
    this.currentFormIndex = this.dividendList.length - 1;
    this.dividend = this.dividendList[this.currentFormIndex];
    this.isAddingNew = true;
  }

  onPrevious() {
    if (this.currentFormIndex > 0) {
      this.currentFormIndex--;
      this.dividend = this.dividendList[this.currentFormIndex];
      this.isAddingNew = !this.dividend._id;
    }
  }

  private handleError(action: 'adding' | 'updating', error: any) {
    this.toast.error(`Failed to ${action} dividend`, 'Error');
    console.error(`Error ${action} dividend:`, error);
  }
}
