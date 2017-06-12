import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'

@Component({
  selector: 'bkng-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
