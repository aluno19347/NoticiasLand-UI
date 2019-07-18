import { Component } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loading = false;

    form: FormGroup = new FormGroup({
        username: new FormControl('', [
            Validators.required,
            Validators.pattern('[a-zA-Z0-9 _-]*'),
            Validators.maxLength(24),
            Validators.minLength(6)
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.maxLength(24),
            Validators.minLength(6)
        ])
    });

    get username(): AbstractControl {
        return this.form.get('username');
    }

    get password(): AbstractControl {
        return this.form.get('password');
    }

    constructor(private _authService: AuthService) {}

    submit(): void {
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
    }
}
