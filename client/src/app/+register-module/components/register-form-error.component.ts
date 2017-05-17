import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-register-form-error',
  template: `
    <div
      ngxErrors="username"
      #usernameError="ngxErrors"
    >
      <div
        ngxError="required"
        [when]="['dirty', 'touched']"
      >Username is required</div>
      <div
        ngxError="minAndMaxLengthError"
        [when]="['dirty', 'touched']"
      >
        Username must be min length
        {{
          usernameError.getError('minAndMaxLengthError')?.minLength
        }}
        and max length
        {{
          usernameError.getError('minAndMaxLengthError')?.maxLength
        }}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormErrorComponent {}
