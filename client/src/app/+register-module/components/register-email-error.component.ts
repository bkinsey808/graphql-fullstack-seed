import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-register-email-error',
  template: `
    <div
      ngxErrors="email"
      #emailError="ngxErrors"
    >
      <div
        ngxError="required"
        [when]="['dirty', 'touched']"
      >Email Address is required</div>
      <div
        ngxError="minAndMaxLengthError"
        [when]="['dirty', 'touched']"
      >
        Email Address must be min length
        {{
          emailError.getError('minAndMaxLengthError')?.minLength
        }}
        and max length
        {{
          emailError.getError('minAndMaxLengthError')?.maxLength
        }}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterEmailErrorComponent {

}
