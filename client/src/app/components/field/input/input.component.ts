import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() name: string;
  @Input() type: string;
  @Input() formControl: FormControl;
  @Input() formControlName: string;

  @Output() change: Subject<string> = new Subject<string>();
  @Output() blur: Subject<null> = new Subject<null>();

  constructor() { }

  ngOnInit() {
  }

  onChange(inputValue) {
    this.change.next(inputValue);
  }

  onBlur() {
    this.blur.next();
  }

}
