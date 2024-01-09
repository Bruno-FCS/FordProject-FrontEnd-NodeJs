import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormValidations } from '../../validators';
import { RegisterService } from '../../services';
import { User } from '../../models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  error = false;
  siteKey: string = '6Lcf7esgAAAAACeLx5S-HlLsWUfr_7CUhB7SW1Y-';

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerService.clearRegister();

    this.registerForm = this.formBuilder.group({
      user_name: [null, [Validators.required, Validators.minLength(5)]],
      user_email: [null, [Validators.required, Validators.email]],
      user_full_name: [null, Validators.required],
      user_password: [null, [Validators.required, Validators.minLength(6)]],
      user_password_confirm: [
        null,
        [Validators.required, FormValidations.equalsTo('user_password')],
      ],
      checkbox: [false, Validators.requiredTrue],
      recaptcha: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const user = this.registerForm.getRawValue() as User;
      this.registerService.register(user).subscribe(
        () => {
          this.registerService.setRegister();
          this.router.navigate(['login/register-success']);
        },
        (error) => {
          this.error = true;
        }
      );
    }
  }
}
