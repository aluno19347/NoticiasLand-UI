import { Component } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { ConfirmPasswordErrorStateMatcher } from './custom-validators/ConfirmPasswordErrorStateMatcher';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
    loading = false;
    errorMatcher = new ConfirmPasswordErrorStateMatcher();

    form: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        username: new FormControl('', [
            Validators.required,
            Validators.pattern('[a-zA-Z0-9 _-]*'),
            Validators.maxLength(24),
            Validators.minLength(6)
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        passwords: new FormGroup(
            {
                password: new FormControl('', Validators.required),
                passwordConfirmation: new FormControl('', Validators.required)
            },
            [this._checkPasswords]
        )
    });

    get email(): AbstractControl {
        return this.form.get('email');
    }

    get name(): AbstractControl {
        return this.form.get('name');
    }

    get username(): AbstractControl {
        return this.form.get('username');
    }

    get password(): AbstractControl {
        return this.form.get('passwords').get('password');
    }

    get passwordsGroup(): AbstractControl {
        return this.form.get('passwords');
    }

    constructor(private _authService: AuthService) {}

    submit(): void {
        if (this.form.invalid) {
            return;
        }

        const credentials = {
            name: this.form.value.name,
            email: this.form.value.email,
            password: this.form.controls.passwords.value.password
        };

        this.loading = true;
    }

    private _checkPasswords(group: FormGroup): { [key: string]: any } | null {
        if (
            !group.controls.password.touched ||
            !group.controls.passwordConfirmation.touched
        ) {
            return null;
        }
        const pass = group.controls.password.value;
        const confirmPass = group.controls.passwordConfirmation.value;

        return pass === confirmPass ? null : { notSame: true };
    }
}
