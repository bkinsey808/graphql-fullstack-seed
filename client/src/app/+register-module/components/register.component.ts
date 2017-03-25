declare var require: any;

import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Subject } from 'rxjs/Subject';
import { DocumentNode } from 'graphql';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ValidationService } from 'app/control-module/services/validation.service';
import { RegisterMutation } from '../../../graphql/schema';


// todo figure out how to refactor this to not use require
const RegisterMutationNode: DocumentNode =
  require('graphql-tag/loader!../../../graphql/Register.graphql');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public username: FormControl;
  public email: FormControl;
  public password: FormControl;


  constructor(private formBuilder: FormBuilder, private apollo: Apollo) {
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


   // Call the mutation called addUser
    this.apollo.mutate<RegisterMutation>({
      mutation: RegisterMutationNode,
      variables: {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      },
    })
      .toPromise()
      .then(({ data }) => {
        console.log('got a new user', data);

      })
      .catch((errors: any) => {
        console.log('there was an error sending the query', errors);
      });


  }

}
