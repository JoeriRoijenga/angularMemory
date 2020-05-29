import { HttpResponse } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  error: boolean = false;
  errorMessage: string;

  readonly loginForm = new FormGroup({
    'name': new FormControl('', [
      Validators.required
    ]),
    'password': new FormControl('', [
      Validators.required
    ]),
  });

  constructor(private authService: AuthService) { }

  get name() : FormControl{
    return this.loginForm.get('name') as FormControl;
  }

  get password() : FormControl{
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {
    const formValues = this.loginForm.value;

    this.error = false;
    if (formValues.name && formValues.password){
      this.authService.login(formValues.name, formValues.password)
        .subscribe(
          response => {
            console.log(response)
          },
          errorResponse => {
            this.error = true;
            if (errorResponse.status == 404){
              this.errorMessage = `No user found with name ${this.name.value}`;
            }else{
              this.errorMessage = "Invalid credentials";
            }
          }
        );
    }
  }
}
