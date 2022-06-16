import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  goToLoginPage() {
    const params = [
      'response_type=code',
      'client_id=' + environment.client_id,
      'scope=user-read-email%20user-read-private%20user-top-read',
      'redirect_uri=http://localhost:4200/dashboard'
    ];
    window.location.href = 'https://accounts.spotify.com/authorize?' + params.join('&');
  }
}
