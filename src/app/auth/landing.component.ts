import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'auth/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    this.authService.login(form);
  }
}
