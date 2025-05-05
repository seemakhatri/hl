import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FundFile } from 'src/app/Model';
import { ApiService } from 'src/app/services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { FundRejectionDialogComponent } from '../fund-rejection-dialog/fund-rejection-dialog.component';

@Component({
  selector: 'app-pending-fund-file',
  templateUrl: './pending-fund-file.component.html',
  styleUrls: ['./pending-fund-file.component.scss']
})
export class PendingFundFileComponent {
  pendingList: FundFile[] = [];
  rejectedList: FundFile[] = [];


  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private toast: ToasterService
  ) {}

  ngOnInit(): void {
    this.loadStockFiles();
  }


  loadStockFiles(): void {
    this.apiService.get<FundFile[]>('fund-files').subscribe(
      (files: FundFile[]) => {
        this.pendingList = files.filter(f => f.status === 'pending');
        this.rejectedList = files.filter(f => f.status === 'rejected');
      },
      error => {
        console.error('Failed to load Fund files', error);
      }
    );
    
  }


  approve(item: FundFile): void {
    if (!item._id) return;

    this.apiService.put(`fund-files/approve/${item._id}`, {}).subscribe(
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

  openRejectDialog(item: FundFile): void {
    const dialogRef = this.dialog.open(FundRejectionDialogComponent, {
      data: { fundFieldId: item._id } // Pass the stockFileId to the dialog
    });

    dialogRef.afterClosed().subscribe((reason: string) => {
      if (reason) {
        this.apiService.put(`fund-files/reject/${item._id}`, { reason }).subscribe(
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
