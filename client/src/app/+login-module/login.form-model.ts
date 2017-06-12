import {
  DynamicFormControlModel,
  DynamicCheckboxModel,
  DynamicInputModel,
  DynamicRadioGroupModel,
} from '@ng2-dynamic-forms/core'

export const LOGIN_FORM_MODEL: DynamicFormControlModel[] = [
  new DynamicInputModel({
    id: 'usernameOrEmail',
    placeholder: 'Username or Email',
    autoFocus: true,
    validators: {
      required: null,
    },
    errorMessages: {
      required: '{{placeholder}} is required.',
    },
  }),

  new DynamicInputModel({
    id: 'password',
    maxLength: 42,
    inputType: 'password',
    placeholder: 'Password',
  }),
]
