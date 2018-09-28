import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {RegistrationService} from '../services/registration.service';
import {AuthenticationService} from '../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  returnUrl: string;

  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);
  registrationError: string;

  constructor(private registrationService: RegistrationService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  formControlsHasErrors(): boolean {
    return this.usernameFormControl.hasError('required') ||
      this.emailFormControl.hasError('required') ||
      this.emailFormControl.hasError('email') ||
      this.passwordFormControl.hasError('required') ||
      this.passwordFormControl.hasError('minlength');
  }

  signUp() {
    console.log(this.usernameFormControl.value);
    console.log(this.emailFormControl.value);
    console.log(this.passwordFormControl.value);
    this.registrationService.register(this.usernameFormControl.value, this.emailFormControl.value, this.passwordFormControl.value)
      .subscribe(
      ok => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.registrationError = error;
        console.log(error);
        // this.error = error;
        // this.loading = false;
      });
  }

}
