import { Component, OnDestroy, OnInit } from '@angular/core';
//import { AuthService } from '../../core/api/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
//import { saveToken } from '../../shared/utils';
import { environment } from '../../../environments/environment';

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

    //private authService: AuthService
    constructor(private fb: FormBuilder,
        private router: Router, private route: ActivatedRoute) {
        this.loginForm = this.fb.group({
            login: [null, Validators.required],
            password: [null, Validators.required],
            rememberMe: new FormControl(false)
        });
    }

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/sheets';
/*         this.rememberMeSubscription = this.authService.loginData.subscribe((data: FormGroup) => {
            if (data) {
                this.login(data);
            }
        }, error => console.error(error));
        this.authService.rememberMe(); */
    }

/*     login(loginForm: FormGroup) {
        this.error = '';
        if (loginForm.valid) {
            if (loginForm.value['rememberMe'] == true) {
                this.authService.rememberMe(loginForm);
            }

            this.authService.login(loginForm.value.login, loginForm.value.password).subscribe((data: Token) => {
                saveToken(data);

                if (this.authService.isNew()) {
                    this.router.navigate(['/new-pwd']);
                } else {
                    this.router.navigate([this.returnUrl]);
                }
            }, error => {
                console.error('An error occurred', error);
                this.error = 'Veuillez vérifier vos informations de connexion';
            })
        }
    } */

    ngOnDestroy() {
        this.rememberMeSubscription.unsubscribe();
    }

}
