declare var require: any

import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { Validators, FormGroup, FormControl } from '@angular/forms'
import { Apollo } from 'apollo-angular'
import { MutationOptions } from 'apollo-client'
import { ApolloQueryResult, ApolloError } from 'apollo-client'
import { DocumentNode } from 'graphql'
import { Observer } from 'rxjs/Observer'
import {
  DynamicFormControlModel,
  DynamicFormService,
} from '@ng2-dynamic-forms/core'

import { LOGIN_FORM_MODEL } from '../login.form-model'

import { ValidationService } from 'app/app-module/services/validation.service'
import { AuthService } from 'app/app-module/services/auth.service'
import { LoginMutation } from '../../../graphql/schema'

// todo figure out how to refactor this to not use require
const LoginMutationNode: DocumentNode = require('graphql-tag/loader!../../../graphql/Login.graphql')

@Component({
  selector: 'bkng-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  formModel: DynamicFormControlModel[] = LOGIN_FORM_MODEL
  formGroup: FormGroup

  constructor(
    private apollo: Apollo,
    private formService: DynamicFormService,
  ) {}

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel)
  }

  getLoginObserver(): Observer<ApolloQueryResult<LoginMutation>> {
    const next = ({ data }) => AuthService.setJwtToken(data.login.token)
    const handledErrors = ['loginFailed']
    const error = ValidationService.getErrorHandler({
      handledErrors,
      form: this.formGroup,
    })
    const complete = () => console.log('complete')
    return { next, error, complete }
  }

  getLoginMutationOptions(): MutationOptions {
    return {
      mutation: LoginMutationNode,
      variables: this.formGroup.value,
    }
  }

  submit() {
    this.apollo
      .mutate<LoginMutation>(this.getLoginMutationOptions())
      .subscribe(this.getLoginObserver())
  }
}
