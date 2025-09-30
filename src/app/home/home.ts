import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  onRegister() {
    this.router.navigate(['/register']);
  }

  onLogin() {
    console.log('Login clicked');
  }
}
