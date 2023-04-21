import { Component, Input } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/Services/auth-service.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  faUser = faUser;
  @Input() backgroundColor: string = 'transparent';
  nameOfUser: string = '';
  showLogout: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getNameOfUser();
  }

  getNameOfUser() {
    const token = this.authService.getAccessToken();
    const decodedToken: any = jwt_decode(token);
    console.log(decodedToken);
    this.nameOfUser = decodedToken.given_name;
  }

  onLogout() {
    this.authService.logout();
  }
}
