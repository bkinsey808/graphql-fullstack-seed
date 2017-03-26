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
import { LoginMutation } from '../../../graphql/schema';


// todo figure out how to refactor this to not use require
const LoginMutationNode: DocumentNode =
  require('graphql-tag/loader!../../../graphql/Login.graphql');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  public form: FormGroup;
  public usernameOrEmail: FormControl;
  public password: FormControl;

  constructor(private formBuilder: FormBuilder, private apollo: Apollo) {
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

    const loginObject = {
      mutation: LoginMutationNode,
      variables: {
        usernameOrEmail: this.form.value.usernameOrEmail,
        password: this.form.value.password,
      },
    };

    this.apollo.mutate<LoginMutation>(loginObject)
      .toPromise()
      .then(({ data }) => {
        console.log('logged in user', data);
        const jwtToken = data.login.id;
      })
      .catch((errors: any) => {
        console.log('there was an error sending the query', errors);
      });
  }

}
