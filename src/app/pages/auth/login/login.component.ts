import { AuthService } from '@app/pages/auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private isValidEmail = /\S+@\S+\.\S*/;
  private subscription = new Subscription();

  showPass = false;

  loginForm = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.pattern(this.isValidEmail)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // const userData = {
    //   username: 'jpolstre@gmail.com',
    //   password: '5972406'
    // }
    // this.authSvc.login(userData).subscribe(res => console.log('Login'))
  }

  //SIMPRE QUE SE HAGA UN subscribe(..), se debe hacer un unsubscribe(...) para evitar el consumo de memoria.
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //SIMPRE QUE SE HAGA UN subscribe(..), se debe hacer un unsubscribe(...) para evitar el consumo de memoria.
  onLogin() {
    if (this.loginForm.invalid) return;
    const formValue = this.loginForm.value;

    //this.subscription.add(..., solo es para poder des-suscribirse cuando el componente se destruya.
    this.subscription.add(
      this.authSvc.login(formValue).subscribe((res) => {
        if (res) {
          this.router.navigate(['']);
        }
      })
    );
  }
  getErrorMessage(field: string) {
    let message;
    const formField = this.loginForm.get(field);
    if (formField.errors.required) {
      message = 'You must enter a value.';
    } else if (formField.hasError('pattern')) {
      message = 'Not a valid email.';
    } else if (formField.hasError('minLength')) {
      const minLength = formField.errors?.minlength.requiredLength;
      message = `This field must  be longer than ${minLength} characters`;
    }
    return message;
  }

  isNotValidField(field: string): boolean {
    const formField = this.loginForm.get(field);
    //(si ha sido tocado o esta sucio) y no es valido
    return (formField.touched || formField.dirty) && !formField.valid;
  }
}
