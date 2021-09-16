import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  state = AuthenticatorCompState.LOGIN;
  user: User;
  constructor(private authService:AuthService, private router:Router) { 

  }

  ngOnInit() : void {
  }

  onLogin(
    loginEmail: HTMLInputElement,
    loginPassword: HTMLInputElement
  ){
    let email = loginEmail.value;
    let password = loginPassword.value;

    if(this.isNotEmpty(email) && this.isNotEmpty(password)) {
      this.user = new User("", "", email, password);
      this.authService.login(this.user).subscribe(
        response => {
            if (response._id) {
              localStorage.setItem('token', JSON.stringify(response._id));
              this.router.navigate(["posts"]);
              console.log('success');
            } else {
              console.log('error');
            }
        },
        error => {
            console.log(<any>error);
        }
    );
    }

  }

  onRegister(
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerName: HTMLInputElement
  ){
    //The fields are mapped in wrong variables, need to check
    let email = registerPassword.value;
    let password = registerName.value;
    let username = registerEmail.value;

    if(
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) && 
      this.isNotEmpty(username)
    ){
      this.user = new User("", username, email, password);
      console.log(this.user);
      this.authService.register(this.user).subscribe(
        response => {
            if (response._id) {
              this.onLoginClick();
            } else {
              console.log('error');
            }
        },
        error => {
            console.log(<any>error);
        }
    );
    }

  }

  isNotEmpty(text: string){
    return text != null && text.length > 0;
  }

  onRegisterClick(){
    this.state = AuthenticatorCompState.REGISTER;
  }

  onLoginClick(){
    this.state = AuthenticatorCompState.LOGIN;
  }

  isLoginState(){
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegisterState(){
    return this.state == AuthenticatorCompState.REGISTER;
  }

  getStateText(){
    switch(this.state){
      case AuthenticatorCompState.LOGIN:
        return "Login";
      case AuthenticatorCompState.REGISTER:
        return "Register";
    }
  }

}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
}
