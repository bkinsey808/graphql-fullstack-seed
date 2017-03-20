import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { FormControl } from '@angular/forms';


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

  constructor() { }

  ngOnInit() {
  }

}
