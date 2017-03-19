import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';

import { ValidationService } from 'app/services/validation.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(3)]],
      'email': ['', [Validators.required, ValidationService.passwordValidator]],
      'password': ['', [Validators.required, ValidationService.passwordValidator]],
    });

  }

  ngOnInit() {
  }

  registerUser() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      alert(`Name: ${this.registerForm.value.username} Email: ${this.registerForm.value.email}`);
    }
  }

}
