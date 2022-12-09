import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });
  public isLogin = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public snack: MatSnackBar,
    public dataService: DataService,
    private toast: ToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initLoginForm();
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.minLength(3)]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  // public isFieldInvalid(field: string) {
  //   if (this.form.get(field)?.touched) {
  //     return !this.form.get(field)?.valid;
  //   }
  // }

  public login() {
    if (this.loginForm.valid) {
      this.isLogin = true;
      this.authService
        .loginWithUserCredentials(
          this.loginForm.value.email,
          this.loginForm.value.password
        )
        .subscribe(
          (res) => {
            console.log('🚀 ~ line 30 ~ AdminloginPage ~  ~ res', res);
            localStorage.setItem('session', JSON.stringify(res.tokens));
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('user_type', res.user.role);
            this.activatedRoute.queryParams.subscribe((x: any) => {
              console.log(x);
              if (x?.returnUrl) {
                this.router.navigate([x?.returnUrl]);
              } else {
                this.router.navigate(['/pages']);
              }
            });
          },
          (error) => {
            console.log(
              '🚀  ~ line 48 ~ AdminloginPage ~ .subscribe ~ error',
              error
            );
            this.toast.showToast({ message: error, type: 'ERROR' });
          }
        );
    }
  }

  forgetClick() {
    this.router.navigate(['/auth/forget']);
  }
}
