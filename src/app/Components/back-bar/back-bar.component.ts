import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/Services/admin-service.service';
import { AuthService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-back-bar',
  templateUrl: './back-bar.component.html',
  styleUrls: ['./back-bar.component.scss'],
})
export class BackBarComponent {
  leftArrow = faAngleLeft;
  isAdmin: boolean = false;
  edit: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.adminService.isAdmin.subscribe((admin) => (this.isAdmin = admin));
    this.adminService.edit.subscribe((edit) => (this.edit = edit));
    console.log(this.isAdmin);
  }

  onBack() {
    this.router.navigate(['/countries']);
  }

  onEdit() {
    this.adminService.edit.next(true);
  }

  onDone() {
    this.adminService.edit.next(false);
  }
}
