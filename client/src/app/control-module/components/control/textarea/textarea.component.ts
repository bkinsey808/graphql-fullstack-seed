import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  ViewChild,
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

  public inputRef;

  @ViewChild('input')
  set input(ref) {
    this.inputRef = ref;
  }

  @Input() name: string;
  @Input() focusOnInit: boolean;

  @Output() change: Subject<string> = new Subject<string>();
  @Output() blur: Subject<null> = new Subject<null>();

  constructor() { }

  ngOnInit() {
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
