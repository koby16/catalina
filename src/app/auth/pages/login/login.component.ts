import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  
  constructor(
    private afServ: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(){
    console.log('Form --> ', this.loginForm.value)
    const { email, password } = this.loginForm.value
    this.afServ.SignIn( email, password )
  }

  authState(){
    this.afServ.userData.subscribe(res => {
      console.log(res?.uid)
    })
  }

}
