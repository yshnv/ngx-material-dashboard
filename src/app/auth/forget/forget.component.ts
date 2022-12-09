import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { HttpApi } from 'src/app/core/http/http-api';
import { DataService } from 'src/app/core/services/data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss'],
})
export class ForgetComponent implements OnInit {
  public forgetForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toast: ToastService,
    private router: Router
  ) {
    this.forgetForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
    });
  }

  ngOnInit(): void {}
  get getemail() {
    return this.forgetForm.get('email');
  }
  Send() {
    if (this.forgetForm.valid) {
      this.dataService
        .postMethod(HttpApi.forgetPassword, this.forgetForm.value)
        .subscribe(
          (res: any) => {
            console.log('res ', res);
            this.router.navigate([
              '/auth/verify-otp',
              { EmailId: this.forgetForm.value.email },
            ]);
          },
          (error: any) => {
            console.log('error ', error);
            this.toast.showToast(error.message);
          }
        );
    }
  }
}
