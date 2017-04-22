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
import {
  Observable,
  Subscriber
} from 'rxjs';

import 'rxjs/add/operator/toPromise';

import { ValidationService } from 'app/control-module/services/validation.service';
import { AuthService } from 'app/app-module/services/auth.service';
import { LoginMutation } from '../../../graphql/schema';
import { AppMessagesComponent } from '../../control-module/components/control/messages/messages.component';


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
  public formError$: Subject<any>;
  public usernameOrEmailError$: Subject<any>;
  public passwordError$: Subject<any>;
  private usernameOrEmailSubscriber;
  private passwordSubscriber;

  constructor(private formBuilder: FormBuilder, private apollo: Apollo) {
    this.formError$ = new Subject<string>();
    this.usernameOrEmailError$ = new Subject<string>();
    this.passwordError$ = new Subject<string>();

    this.initForm();
    this.initErrorHandling();

    this.usernameOrEmailSubscriber = this.getFormControlErrorSubscriber(
      this.usernameOrEmail,
      this.usernameOrEmailError$
    );
    this.passwordSubscriber = this.getFormControlErrorSubscriber(
      this.password,
      this.passwordError$
    );

  }

  getFormControlErrorSubscriber(
    formControl: FormControl,
    error$: Subject<any>
  ) {
    return Subscriber.create(x => {
      if (formControl.touched) {
        console.log(formControl.errors);
        error$.next(formControl.errors);
      }
    });
  }

  initForm() {
    this.usernameOrEmail = new FormControl('', Validators.required);
    this.password = new FormControl('', ValidationService.passwordValidator);

    this.form = new FormGroup({
      usernameOrEmail: this.usernameOrEmail,
      password: this.password,
    });

    this.usernameOrEmail.valueChanges.subscribe(this.usernameOrEmailSubscriber);
    this.password.valueChanges.subscribe(this.passwordSubscriber);
  }


  usernameOrEmailBlur() {
    if (this.usernameOrEmail.touched) {
      this.usernameOrEmailError$.next(this.usernameOrEmail.errors);
    }
  }

  passwordBlur() {
    if (this.password.touched) {
      this.passwordError$.next(this.password.errors);
    }
  }


  initErrorHandling() {
    this.formError$ = new Subject<any>();

    const formSubscriber =
      Subscriber.create(this.subscribeNext, this.subscribeError);
    this.form.valueChanges.subscribe(formSubscriber);
  }

  subscribeNext(x) {
    // console.log('form next: ',  x);
  }

  subscribeError(err) {
    console.log('form error: ', err);
  }

  submit() {

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
        AuthService.setJwtToken(data.login.token);
      })
      .catch((error) => {
        if (error instanceof ApolloError) {
          const errorMessages =
            error.graphQLErrors.map((graphqlError) => graphqlError.message);
          if (errorMessages.includes('loginFailed')) {
            const errors = { loginFailed: true };

            // can we do both these next 2 lines together automatically somehow?
            this.form.setErrors(errors);
            this.formError$.next(errors);
          }
        }
        console.log('keys', Object.keys(this.form.controls));
        console.log('there was an error sending the query', error);
      });
    return false;
  }


  get errorMessage() {
    // todo write this without a loop
    // console.log(this.form.errors);
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
