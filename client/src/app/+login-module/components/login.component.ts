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
import {
  Apollo,
  ApolloQueryObservable
} from 'apollo-angular';
import {
  ApolloQueryResult,
  ApolloError
} from 'apollo-client';
import { DocumentNode } from 'graphql';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';

import { ValidationService } from 'app/control-module/services/validation.service';
import { AuthService } from 'app/app-module/services/auth.service';
import { LoginMutation } from '../../../graphql/schema';


// todo figure out how to refactor this to not use require
const LoginMutationNode: DocumentNode =
  require('graphql-tag/loader!../../../graphql/Login.graphql');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  public test: Subject<string>;

  public form: FormGroup;
  public usernameOrEmail: FormControl;
  public password: FormControl;

  constructor(private formBuilder: FormBuilder, private apollo: Apollo) {
    this.test = new Subject<string>();

    this.usernameOrEmail = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);

    this.form = new FormGroup({
      usernameOrEmail: this.usernameOrEmail,
      password: this.password,
    });
  }
  submit() {
    if (this.form.dirty && this.form.valid) {
      // alert(`Username: ${this.registerForm.value.username} Email: ${this.registerForm.value.email}`);
    }

    this.test.next('x' + Math.random());

    const loginObject = {
      mutation: LoginMutationNode,
      variables: {
        usernameOrEmail: this.form.value.usernameOrEmail,
        password: this.form.value.password,
      },
    };

    console.log('sedign mutation');

    this.apollo.mutate<LoginMutation>(loginObject)
      .toPromise()
      .then(({ data }) => {
        console.log('logged in user', data);
        AuthService.setJwtToken(data.login.token);
      })
      .catch((error) => {
        if (error instanceof ApolloError) {
          const errorMessages =
            error.graphQLErrors.map((graphqlError) => graphqlError.message);
          if (errorMessages.includes('loginFailed')) {
            console.log('yes, here');
            this.form.setErrors({ loginFailed: true });
          }
        }
        console.log('keys', Object.keys(this.form.controls));
        console.log('there was an error sending the query', error);
      });
  }

  get errorMessage() {
    // todo write this without a loop
    console.log(this.form.errors);
    for (let propertyName in this.form.errors) {
      if (
        this.form.errors.hasOwnProperty(propertyName) &&
        this.form.touched
      ) {
        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.form.errors[propertyName]
        );
      }
    }

    return null;
  }


}
