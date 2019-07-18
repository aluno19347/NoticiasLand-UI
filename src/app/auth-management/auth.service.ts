import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private _httpClient: HttpClient,
        private _UserService: UserService
    ) {}
}
