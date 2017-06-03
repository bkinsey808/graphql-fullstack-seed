import {
  DynamicFormControlModel,
  DynamicCheckboxModel,
  DynamicInputModel,
  DynamicRadioGroupModel
} from '@ng2-dynamic-forms/core';

export const REGISTER_FORM_MODEL: DynamicFormControlModel[] = [

  new DynamicInputModel({
    id: 'username',
    maxLength: 42,
    placeholder: 'Username',
    autoFocus: true,
    validators: {
      required: null,
    },
    errorMessages: {
      required: '{{placeholder}} is required.'
    }
  }),

  new DynamicInputModel({
    id: 'emailAddress',
    maxLength: 42,
    placeholder: 'Email Address'
  }),

  new DynamicInputModel({
    id: 'password',
    maxLength: 42,
    inputType: 'password',
    placeholder: 'Password'
  }),


];
