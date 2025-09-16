import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  onRegister() {
    console.log('Register clicked');
  }

  onLogin() {
    console.log('Login clicked');
  }
}
