import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {

  @Input() name: string;
  @Input() formControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

}
