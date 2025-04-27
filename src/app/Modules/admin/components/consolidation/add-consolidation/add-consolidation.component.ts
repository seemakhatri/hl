import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Consolidation } from 'src/app/Model';
import { ApiService } from 'src/app/services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-consolidation',
  templateUrl: './add-consolidation.component.html',
  styleUrls: ['./add-consolidation.component.scss']
})
export class AddConsolidationComponent {
  consolidation: Consolidation = new Consolidation('', '', '', '');
  isEditMode: boolean = false;

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AddConsolidationComponent>,
    private toast: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: { consolidation: Consolidation } | null
  ) {}

  ngOnInit() {
    if (this.data?.consolidation) {
      this.consolidation = { 
        ...this.data.consolidation,
        recordDate: this.formatDate(this.data.consolidation.recordDate),
        effectiveDate: this.formatDate(this.data.consolidation.effectiveDate)
      };
      console.log('Consolidation data loaded:', this.consolidation);
  
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
    const endpoint = 'consolidations';
    
    if (this.isEditMode) {
      console.log('Submitting update for consolidation:', this.consolidation);
      
      // Ensure you're using the correct id field here
      this.apiService.put(`${endpoint}/${this.consolidation._id}`, this.consolidation).subscribe(
        () => {
          this.toast.success('Consolidation updated successfully', 'Success');
          this.dialogRef.close('refresh');
        },
        error => {
          this.toast.error('Failed to update consolidation', 'Error');
          console.error('Error updating consolidation:', error);
        }
      );
    } else {
      this.apiService.post(endpoint, this.consolidation).subscribe(
        () => {
          this.toast.success('Consolidation added successfully', 'Success');
          this.consolidation = new Consolidation('', '', '', '');
          this.dialogRef.close('refresh');
        },
        error => {
          this.toast.error('Failed to add consolidation', 'Error');
          console.error('Error adding consolidation:', error);
        }
      );
    }
  }
}
