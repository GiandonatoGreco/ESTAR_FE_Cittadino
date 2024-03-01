import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    this.authService.login(form);
  }
}
