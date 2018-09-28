import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {RegistrationService} from '../services/registration.service';
import {AuthenticationService} from '../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  loginError: string;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  formControlsHasErrors(): boolean {
    return this.usernameFormControl.hasError('required') ||
      this.passwordFormControl.hasError('required');
  }

  signIn() {
    console.log(this.usernameFormControl.value);
    console.log(this.passwordFormControl.value);
    this.authenticationService.login(this.usernameFormControl.value, this.passwordFormControl.value)
      .subscribe(
      ok => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.loginError = error;
        console.log(error);
        // this.error = error;
        // this.loading = false;
      });
  }

}
