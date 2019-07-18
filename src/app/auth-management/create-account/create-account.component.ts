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
        email: new FormControl('', Validators.required),
        passwords: new FormGroup(
            {
                password: new FormControl('', Validators.required),
                passwordConfirmation: new FormControl('')
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
        // .subscribe(result => {
        //     this.loading = false;
        //     console.log('result ', result);
        // });
    }

    private _checkPasswords(group: FormGroup): { [key: string]: any } | null {
        console.log('group ', group);
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
