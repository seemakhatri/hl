import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RejectionReasonDialogComponent } from '../rejection-reason-dialog/rejection-reason-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { StockFile } from 'src/app/Model';

@Component({
  selector: 'app-pending-stock-file',
  templateUrl: './pending-stock-file.component.html',
  styleUrls: ['./pending-stock-file.component.scss']
})
export class PendingStockFileComponent implements OnInit {
  pendingList: StockFile[] = [];
  rejectedList: StockFile[] = [];


  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private toast: ToasterService
  ) {}

  ngOnInit(): void {
    this.loadStockFiles();
  }


  loadStockFiles(): void {
    this.apiService.get<StockFile[]>('stock-files').subscribe(
      (files: StockFile[]) => {
        this.pendingList = files.filter(f => f.status === 'pending');
        this.rejectedList = files.filter(f => f.status === 'rejected');
      },
      error => {
        console.error('Failed to load stock files', error);
      }
    );
    
  }


  approve(item: StockFile): void {
    if (!item._id) return;

    this.apiService.put(`stock-files/approve/${item._id}`, {}).subscribe(
      () => {
        this.toast.success('Approved successfully');
        this.pendingList = this.pendingList.filter(i => i._id !== item._id);
      },
      error => {
        this.toast.error('Approval failed');
        console.error('Approval error', error);
      }
    );
  }

  openRejectDialog(item: StockFile): void {
    const dialogRef = this.dialog.open(RejectionReasonDialogComponent, {
      data: { stockFileId: item._id } // Pass the stockFileId to the dialog
    });

    dialogRef.afterClosed().subscribe((reason: string) => {
      if (reason) {
        this.apiService.put(`stock-files/reject/${item._id}`, { reason }).subscribe(
          () => {
            this.toast.success('Rejected successfully');
            this.pendingList = this.pendingList.filter(i => i._id !== item._id);
            this.rejectedList.push({ ...item, status: 'rejected', rejectionReason: reason });
          },
          error => {
            this.toast.error('Rejection failed');
            console.error('Rejection error', error);
          }
        );
      }
    });
  }
}
