import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockSplit } from 'src/app/Model';
import { ApiService } from 'src/app/services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-stock-split',
  templateUrl: './add-stock-split.component.html',
  styleUrls: ['./add-stock-split.component.scss']
})
export class AddStockSplitComponent implements OnInit {
    stockSplit: StockSplit = new StockSplit('', '', '', '');
    isEditMode: boolean = false;

      constructor(
        private apiService: ApiService,
        private dialogRef: MatDialogRef<AddStockSplitComponent>,
        private toast: ToasterService,
        @Inject(MAT_DIALOG_DATA) public data: {stockSplit: StockSplit  } | null
      ) {}

      ngOnInit() {
        if (this.data?.stockSplit) {
          this.stockSplit = { 
            ...this.data.stockSplit,
            recordDate: this.formatDate(this.data.stockSplit.recordDate),
            effectiveDate: this.formatDate(this.data.stockSplit.effectiveDate)
          };
          console.log('Stock Split data loaded:', this.stockSplit);
      
          this.isEditMode = true;
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
        const endpoint = 'stock-splits';
      
        if (this.isEditMode) {
          console.log('Submitting update for stock split:', this.stockSplit);
      
          this.apiService.put(`${endpoint}/${this.stockSplit._id}`, this.stockSplit).subscribe(
            () => {
              this.toast.success('Stock split updated successfully', 'Success');
              this.dialogRef.close('refresh');
            },
            error => {
              this.toast.error('Failed to update stock split', 'Error');
              console.error('Error updating stock split:', error);
            }
          );
        } else {
          this.apiService.post(endpoint, this.stockSplit).subscribe(
            () => {
              this.toast.success('Stock split added successfully', 'Success');
              this.stockSplit = new StockSplit('', '', '', '');
              this.dialogRef.close('refresh');
            },
            error => {
              this.toast.error('Failed to add stock split', 'Error');
              console.error('Error adding stock split:', error);
            }
          );
        }
      }
      

}
