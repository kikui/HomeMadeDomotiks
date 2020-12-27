import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getToken, Token, TokenUser } from '../models/token.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { EncrDecrService } from '../services/encr-decr.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authUrl = environment.apiVersion + '/user/login';

    private loginSubject = new Subject<FormGroup>();
    loginData = this.loginSubject.asObservable();

    private helper: JwtHelperService;

    constructor(private httpClient: HttpClient, private fb: FormBuilder, private encrDecrService: EncrDecrService) {
        this.helper = new JwtHelperService();
    }

    /*     rememberMe(loginForm?) {
            const abc = 'PJo5RuC87nDi46yH3xlrmF4l1LROlfHT';
            if (loginForm) {
                const pwd = this.encrDecrService.set(abc, loginForm.value.password.trim());
                const email = this.encrDecrService.set(abc, loginForm.value.login.trim());
                saveCredentials(email, pwd);
                localStorage.setItem('rememberMe', loginForm.value['rememberMe']);
            } else {
                const rememberMe = localStorage.getItem('rememberMe');
                if (rememberMe == 'true') {
                    const pwd = this.encrDecrService.get(abc, getCredentials().b);
                    const email = this.encrDecrService.get(abc, getCredentials().a);
                    const storageLoginGroup = this.fb.group({
                        login: email,
                        password: pwd,
                        rememberMe: rememberMe
                    });
                    this.loginSubject.next(<FormGroup>storageLoginGroup)
                }
            }
        } */

    login(email: string, pwd: string): Observable<TokenUser> {
        return this.httpClient
            .post(environment.apiUrl + this.authUrl + '/', { email, pwd })
            .pipe(map((data: TokenUser) => data), catchError((err: any) => err.code === 404 ? [] : throwError(err)));
    }

    logout() {
        sessionStorage.clear();
        localStorage.removeItem('token');
        localStorage.removeItem('rememberMe');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    getExpiration() {
        const decodedToken = this.helper.decodeToken(getToken());
        return moment(decodedToken.expiresAt);
    }

    isAdmin(): boolean {
        const decodedToken = this.helper.decodeToken(getToken());
        return decodedToken.isAdmin || decodedToken.role === 'admin';
    }
}
