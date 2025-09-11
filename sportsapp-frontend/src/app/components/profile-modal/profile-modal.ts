import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'


@Component({
  selector: 'app-profile-modal',
  imports: [MatIconModule, CommonModule, MatDialogModule],
  templateUrl: './profile-modal.html',
  styleUrl: './profile-modal.css'
})
export class ProfileModal {

  changePassword() {
    // Will add logic later (yash)
    console.log('Change Password clicked');
    alert('change password')
  }


  logout() {
    // will add logic later (yash)
    console.log('Logout clicked');
    alert('log out');
  }

}
