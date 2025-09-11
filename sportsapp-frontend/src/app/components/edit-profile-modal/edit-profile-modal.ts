import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'edit-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile-modal.html',
  styleUrls: ['./edit-profile-modal.scss']
})
export class EditProfileModal {
  fullName: string;
  bio: string;
  age: number;

  constructor(
    private dialogRef: MatDialogRef<EditProfileModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fullName = data.fullName;
    this.bio = data.bio;
    this.age = data.age;
  }

  save() {
    this.dialogRef.close({
      fullName: this.fullName,
      bio: this.bio,
      age: this.age
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
