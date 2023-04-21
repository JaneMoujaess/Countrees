import { Component } from '@angular/core';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-back-bar',
  templateUrl: './back-bar.component.html',
  styleUrls: ['./back-bar.component.scss']
})
export class BackBarComponent {
  leftArrow=faAngleLeft;
}
