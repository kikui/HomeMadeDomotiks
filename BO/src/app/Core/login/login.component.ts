import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/Services/auth.service';
import { saveToken, TokenUser } from 'src/app/models/token.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    appVersion = environment.version;

    error: string;
    loginForm: FormGroup;
    hide = true;

    private returnUrl: string;

    private rememberMeSubscription: Subscription;

    constructor(private fb: FormBuilder, private authService: AuthService,
        private router: Router, private route: ActivatedRoute) {
        this.loginForm = this.fb.group({
            login: [null, Validators.required],
            password: [null, Validators.required],
            rememberMe: new FormControl(false)
        });
    }

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/infos';
        /* this.rememberMeSubscription = this.authService.loginData.subscribe((data: FormGroup) => {
            if (data) {
                this.login(data);
            }
        }, error => console.error(error));
        this.authService.rememberMe(); */
    }

    login(loginForm: FormGroup) {
        this.error = '';
        if (loginForm.valid) {
            if (loginForm.value['rememberMe'] == true) {
                //this.authService.rememberMe(loginForm);
            }

            this.authService.login(loginForm.value.login, loginForm.value.password).subscribe((data: TokenUser) => {
                saveToken(data.token);
                this.router.navigate([this.returnUrl]);
            }, error => {
                console.error('An error occurred', error);
                this.error = 'Veuillez vérifier vos informations de connexion';
            })
        }
    }

    ngOnDestroy() {
        this.rememberMeSubscription.unsubscribe();
    }
}
