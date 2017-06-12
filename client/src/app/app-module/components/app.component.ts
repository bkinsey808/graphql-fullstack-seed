import { Component, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'bkng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'app works!'
}
