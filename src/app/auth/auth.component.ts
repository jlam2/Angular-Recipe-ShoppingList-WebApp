import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.login(form.value.email, form.value.password);
    }else{
      authObs = this.authService.signup(form.value.email, form.value.password)
    }

    authObs.subscribe(
      response =>{
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorRes => {
        this.error = errorRes;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
