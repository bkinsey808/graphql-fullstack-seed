import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {

  public inputRef;

  @ViewChild('input')
  set input(ref) {
    this.inputRef = ref;
  }

  @Input() name: string;
  @Input() type: string;
  @Input() focusOnInit: boolean;

  @Output() change: Subject<string> = new Subject<string>();
  @Output() blur: Subject<null> = new Subject<null>();

  constructor() { }

  ngAfterViewInit() {
    if (this.focusOnInit) {
      this.inputRef.nativeElement.focus();
    }
  }

  onChange(inputValue) {
    this.change.next(inputValue);
  }

  onBlur() {
    this.blur.next();
  }

}
