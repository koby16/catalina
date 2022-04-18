import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogged = false;
  public user: any;

  constructor(
    private router: Router,
    public afServ: AuthService
  ) {
  }


  ngOnInit(): void {
  }

  onGoToLogin(): void{
    this.router.navigate(['auth/login'])
  }

  onGoToLogout(): void{
    this.afServ.SignOut();
    this.router.navigate(['auth/login'])
  }
  
  onGoToRegister(): void{
    this.router.navigate(['auth/register'])
  }

}
