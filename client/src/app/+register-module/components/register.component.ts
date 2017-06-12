declare var require: any

import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { Validators, FormGroup } from '@angular/forms'
import { Apollo } from 'apollo-angular'
import { MutationOptions } from 'apollo-client'
import { ApolloQueryResult } from 'apollo-client'
import { DocumentNode } from 'graphql'
import {
  DynamicFormControlModel,
  DynamicFormService,
} from '@ng2-dynamic-forms/core'

import { REGISTER_FORM_MODEL } from '../register.form-model'

import { ValidationService } from 'app/app-module/services/validation.service'
import { AuthService } from 'app/app-module/services/auth.service'
import { RegisterMutation } from '../../../graphql/schema'

// todo figure out how to refactor this to not use require
const RegisterMutationNode: DocumentNode = require('graphql-tag/loader!../../../graphql/Register.graphql')

@Component({
  selector: 'bkng-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  formModel: DynamicFormControlModel[] = REGISTER_FORM_MODEL
  formGroup: FormGroup

  constructor(
    private apollo: Apollo,
    private formService: DynamicFormService,
  ) {}

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel)
  }

  getMutationOptions() {
    return {
      mutation: RegisterMutationNode,
      variables: this.formGroup.value,
    }
  }

  getRegisterObserver() {
    const handledErrors = ['emailExists', 'usernameExists', 'registerFailed']
    return {
      next: ({ data }) => {
        console.log('logged in user', data)
        AuthService.setJwtToken(data.register.token)
      },
      error: ValidationService.getErrorHandler({
        handledErrors,
        form: this.formGroup,
      }),
    }
  }

  submit() {
    this.apollo
      .mutate<RegisterMutation>(this.getMutationOptions())
      .subscribe(this.getRegisterObserver())
  }
}
