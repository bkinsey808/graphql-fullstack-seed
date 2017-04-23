import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';


import { AuthService } from 'app/app-module/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AuthService.logout();
  }

}
