import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private afServ: AuthService
  ) { }

  ngOnInit(): void {
  }

  onGoToLogin(): void{
    this.router.navigate(['auth/login'])
  }
  onGoToLogout(): void{
    this.afServ.SignOut();
  }
  onGoToRegister(): void{
    this.router.navigate(['auth/register'])
  }

}
