import { EventEmitter, Injectable, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() getLoggedStatus: EventEmitter<boolean> = new EventEmitter();

  isLogged = !!localStorage.getItem('auth');
  isAdmin = localStorage.getItem('role') === 'admin';

  constructor(private router: Router) {}

  userIsLogged = () => this.isLogged;
  userIsAdmin = () => this.isAdmin;

  login(form: NgForm) {
    console.log(form.value);
    // fake login
    setTimeout(() => {
      this.isLogged = true;
      if (form.value.username === 'admin@mail.com') {
        this.isAdmin = true;
        localStorage.setItem('role', 'admin');
      }
      localStorage.setItem('auth', 'token');
      this.router.navigate(['']);
      this.getLoggedStatus.emit(true);
    }, 500);
  }

  logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('role');
    this.getLoggedStatus.emit(false);
  }
}
