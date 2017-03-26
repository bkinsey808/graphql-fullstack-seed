declare var require: any;

import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { Subject } from 'rxjs/Subject';
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
export class RegisterComponent {

  public form: FormGroup;
  public username: FormControl;
  public email: FormControl;
  public password: FormControl;

  constructor(private formBuilder: FormBuilder, private apollo: Apollo) {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', ValidationService.passwordValidator);
    this.email = new FormControl('', ValidationService.emailValidator);

    this.form = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password,
    });
  }

  submit() {
    if (this.form.dirty && this.form.valid) {
      // alert(`Username: ${this.registerForm.value.username} Email: ${this.registerForm.value.email}`);
    }

    const registerObject = {
      mutation: RegisterMutationNode,
      variables: {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
      },
    };

    this.apollo.mutate<RegisterMutation>(registerObject)
      .toPromise()
      .then(({ data }) => {
        console.log('got a new user', data);
        const jwtToken = data.register.id;
      })
      .catch((errors: any) => {
        console.log('there was an error sending the query', errors);
      });
  }

}
