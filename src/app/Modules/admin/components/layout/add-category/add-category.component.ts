import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuItem } from 'src/app/Model';
import { ApiService } from 'src/app/services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  isEditMode: boolean = false;
  menuItem: MenuItem = new MenuItem('', '');

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    private toast: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: { menuItem: MenuItem } | null
  ) {}

  ngOnInit() {
    if (this.data?.menuItem) {
      this.menuItem = { 
        ...this.data.menuItem,
      };
      console.log('Category data loaded:', this.menuItem);
  
      this.isEditMode = true;
    }
  }
  

  onSubmit() {
    const endpoint = 'menu-items';
    
    if (this.isEditMode) {
      this.apiService.put(`${endpoint}/${this.menuItem._id}`, this.menuItem).subscribe(
        () => {
          this.toast.success('MenuItem updated successfully', 'Success');
          this.dialogRef.close('refresh');
        },
        error => {
          this.toast.error('Failed to update MenuItem', 'Error');
          console.error('Error updating MenuItem:', error);
        }
      );
    } else {
      this.apiService.post(endpoint, this.menuItem).subscribe(
        () => {
          this.toast.success('MenuItem added successfully', 'Success');
          this.menuItem = new MenuItem('', '');
          this.dialogRef.close('refresh');
        },
        error => {
          this.toast.error('Failed to add menuItem', 'Error');
          console.error('Error adding menuItem:', error);
        }
      );
    }
  }
}
