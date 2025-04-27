import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Delisting } from 'src/app/Model';
import { ApiService } from 'src/app/services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-delisting',
  templateUrl: './add-delisting.component.html',
  styleUrls: ['./add-delisting.component.scss']
})
export class AddDelistingComponent {
  delisting: Delisting = new Delisting('', '', '', '');
  isEditMode: boolean = false;

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AddDelistingComponent>,
    private toast: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: { delisting: Delisting } | null
  ) {}

  ngOnInit() {
    if (this.data?.delisting) {
      this.delisting = { 
        ...this.data.delisting,
        exDate: this.formatDate(this.data.delisting.exDate),
        paymentDate: this.formatDate(this.data.delisting.paymentDate)
      };
      console.log('Delisting data loaded:', this.delisting);
  
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
    const endpoint = 'delistings';
    
    if (this.isEditMode) {
      console.log('Submitting update for delisting:', this.delisting);
      
      // Ensure you're using the correct id field here
      this.apiService.put(`${endpoint}/${this.delisting._id}`, this.delisting).subscribe(
        () => {
          this.toast.success('Delistings updated successfully', 'Success');
          this.dialogRef.close('refresh');
        },
        error => {
          this.toast.error('Failed to update delistings', 'Error');
          console.error('Error updating delistings:', error);
        }
      );
    } else {
      this.apiService.post(endpoint, this.delisting).subscribe(
        () => {
          this.toast.success('Delistings added successfully', 'Success');
          this.delisting = new Delisting('', '', '', '');
          this.dialogRef.close('refresh');
        },
        error => {
          this.toast.error('Failed to add delisting', 'Error');
          console.error('Error adding delistings:', error);
        }
      );
    }
  }
}
