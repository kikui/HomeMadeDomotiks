import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getToken, Token, TokenUser } from '../models/token.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import * as crypto from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authUrl = environment.apiVersion + '/user/login';

    private loginSubject = new Subject<FormGroup>();
    loginData = this.loginSubject.asObservable();

    private helper: JwtHelperService;

    constructor(private httpClient: HttpClient, private fb: FormBuilder) {
        this.helper = new JwtHelperService();
    }

    rememberMe(loginForm?) {
        const abc = 'PJo5RuC87nDi46yH3xlrmF4l1LROlfHT';
        if (loginForm) {
            const pwd = crypto.AES.encrypt(loginForm.value.password, abc).toString();
            const email = crypto.AES.encrypt(loginForm.value.login, abc).toString();
            this.saveCredentials(email, pwd);
            localStorage.setItem('rememberMe', loginForm.value['rememberMe']);
        } else {
            const rememberMe = localStorage.getItem('rememberMe');
            if (rememberMe == 'true') {
                const encryptedCredentials = this.getCredentials()
                const pwd = crypto.AES.decrypt(encryptedCredentials.pwd, abc).toString(crypto.enc.Utf8);
                const email = crypto.AES.decrypt(encryptedCredentials.mail, abc).toString(crypto.enc.Utf8);
                const storageLoginGroup = this.fb.group({
                    login: email,
                    password: pwd,
                    rememberMe: rememberMe
                });
                this.loginSubject.next(<FormGroup>storageLoginGroup)
            }
        }
    }

    login(email: string, pwd: string): Observable<TokenUser> {
        return this.httpClient
            .post<TokenUser>(environment.apiUrl + this.authUrl, { email: email, password: pwd })
    }

    logout() {
        sessionStorage.clear();
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('encryptedMail');
        localStorage.removeItem('encryptedPwd');
    }

    public isLoggedIn() {
        let expiration = this.getExpiration();
        if(expiration === null) return false;
        return moment().isBefore(expiration);
    }

    getExpiration() {
        const decodedToken = this.helper.decodeToken(getToken());
        if (decodedToken === null) return null
        return moment(decodedToken.expiresAt);
    }

    public isAdmin(): boolean {
        const decodedToken = this.helper.decodeToken(getToken());
        return decodedToken.isAdmin === true;
    }

    private saveCredentials(encryptMail, encryptPwd) {
        localStorage.clear()
        localStorage.setItem('encryptedMail', encryptMail)
        localStorage.setItem('encryptedPwd', encryptPwd)
    }

    private getCredentials() {
        return {
            mail: localStorage.getItem('encryptedMail') || '',
            pwd: localStorage.getItem('encryptedPwd') || ''
        }
    }
}
