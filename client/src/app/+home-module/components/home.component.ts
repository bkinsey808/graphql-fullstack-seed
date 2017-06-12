import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'

@Component({
  selector: 'bkng-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
