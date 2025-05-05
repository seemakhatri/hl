import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-fund-rejection-dialog',
  templateUrl: './fund-rejection-dialog.component.html',
  styleUrls: ['./fund-rejection-dialog.component.scss']
})
export class FundRejectionDialogComponent {
  reason: string = '';
  fundFieldId: string = '';


  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { fundFieldId: string }, 
    private dialogRef: MatDialogRef<FundRejectionDialogComponent> 
  ) {
    this.fundFieldId = data.fundFieldId;
  }

  onSubmit(): void {
    if (!this.reason.trim()) return;

    const body = { reason: this.reason };
    const endpoint = 'fund-files/reject';  
    this.apiService.put(`${endpoint}/${this.fundFieldId}`, body).subscribe({
      next: (res) => {
        console.log('Rejection successful', res);
        this.dialogRef.close(this.reason);
      },
      error: (err) => {
        console.error('Error rejecting fund file', err);
      }
    });
  }
}
