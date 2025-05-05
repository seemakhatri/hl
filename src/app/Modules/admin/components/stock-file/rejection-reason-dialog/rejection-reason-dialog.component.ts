import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-rejection-reason-dialog',
  templateUrl: './rejection-reason-dialog.component.html',
  styleUrls: ['./rejection-reason-dialog.component.scss']
})
export class RejectionReasonDialogComponent {
  reason: string = '';
  stockFileId: string = '';


  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { stockFileId: string }, 
    private dialogRef: MatDialogRef<RejectionReasonDialogComponent> 
  ) {
    this.stockFileId = data.stockFileId;
  }

  onSubmit(): void {
    if (!this.reason.trim()) return;

    const body = { reason: this.reason };
    const endpoint = 'stock-files/reject';  
    this.apiService.put(`${endpoint}/${this.stockFileId}`, body).subscribe({
      next: (res) => {
        console.log('Rejection successful', res);
        this.dialogRef.close(this.reason);
      },
      error: (err) => {
        console.error('Error rejecting stock file', err);
      }
    });
  }
}
