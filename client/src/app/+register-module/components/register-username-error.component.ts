import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-register-username-error',
  template: `
  <div ngxErrors>
    <div
      ngxError="emailExists"
      [when]="['dirty', 'touched']"
    >Email Address already registered.</div>
    <div
      ngxError="usernameExists"
      [when]="['dirty', 'touched']"
    >Username already registered.</div>
    <div
      ngxError="registerError"
      [when]="['dirty', 'touched']"
    >Unknown error while trying to register. Please try again later.</div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterUsernameErrorComponent {}
