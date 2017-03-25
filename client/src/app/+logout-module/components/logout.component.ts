import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
