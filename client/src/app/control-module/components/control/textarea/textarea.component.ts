import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent {

  @Input() name: string;

  @Output() change: Subject<string> = new Subject<string>();
  @Output() blur: Subject<null> = new Subject<null>();

  constructor() { }
}
