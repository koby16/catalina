import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private afServ: AuthService
  ) { }

  ngOnInit(): void {
  }

  onRegister(){
    console.log('Form --> ', this.registerForm.value)
    const { email, password } = this.registerForm.value
    this.afServ.SignUp( email, password )
  }

}
