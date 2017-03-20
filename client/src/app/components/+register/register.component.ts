import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';

import { ValidationService } from 'app/services/validation.service';


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
    this.username = new FormControl('');
    this.email = new FormControl('');
    this.password = new FormControl('');

    this.registerForm = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password,
    });

  }

  ngOnInit() {
  }

  registerUser() {
    console.log('register user');
    if (this.registerForm.dirty && this.registerForm.valid) {
      alert(`Name: ${this.registerForm.value.username} Email: ${this.registerForm.value.email}`);
    }
  }

}
