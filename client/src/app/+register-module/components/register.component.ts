declare var require: any;

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { MutationOptions } from 'apollo-client'
import { ApolloQueryResult } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { Observer } from 'rxjs';

import { ValidationService } from 'app/app-module/services/validation.service';
import { AuthService } from 'app/app-module/services/auth.service';
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

  constructor(private apollo: Apollo) {
    this.initForm();
  }

  initForm() {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', ValidationService.passwordValidator);
    this.email = new FormControl('', [
      Validators.required,
      ValidationService.emailValidator,
    ]);

    this.form = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password,
    });
  }

  getRegisterObserver(): Observer<ApolloQueryResult<RegisterMutation>> {
    const next = ({ data }) => {
      console.log('logged in user', data);
      AuthService.setJwtToken(data.register.token);
    };
    const handledErrors =
      ['emailExists', 'usernameExists', 'registerFailed'];
    const error = ValidationService.getErrorHandler({
      handledErrors,
      form: this.form,
    });
    const complete = () => console.log('complete');
    return { next, error, complete };
  }

  getRegisterMutationOptions(): MutationOptions {
    return {
      mutation: RegisterMutationNode,
      variables: this.form.value,
    };
  }

  submit() {
    this.apollo.mutate<RegisterMutation>(
      this.getRegisterMutationOptions()
    )
      .subscribe(this.getRegisterObserver());
  }

}
