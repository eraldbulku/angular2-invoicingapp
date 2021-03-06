import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
     private _authService: AuthenticationService,
     ){}

  ngOnInit(){
     this._authService.checkCredentials();
  }

  logout() {
     this._authService.logout();
  }
}
