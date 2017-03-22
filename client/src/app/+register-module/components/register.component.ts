import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';

import { ValidationService } from 'app/control-module/services/validation.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public username: FormControl;
  public email: FormControl;
  public password: FormControl;

  constructor(private formBuilder: FormBuilder) {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', ValidationService.passwordValidator);
    this.email = new FormControl('', ValidationService.emailValidator);

    this.registerForm = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password,
    });

  }

  ngOnInit() {
  }

  registerUser() {
    console.log('register user', this.username);
    if (this.registerForm.dirty && this.registerForm.valid) {
      alert(`Username: ${this.registerForm.value.username} Email: ${this.registerForm.value.email}`);
    }
  }

}
