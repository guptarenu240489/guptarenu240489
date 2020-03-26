import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAdmin = false;
  constructor() { }

  login() {
    this.isAdmin = true;
  }

  logout() {
    this.isAdmin = false;
  }
}
