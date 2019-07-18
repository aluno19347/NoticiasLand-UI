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
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
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
