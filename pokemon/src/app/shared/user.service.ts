import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isAdmin = true;
  constructor() { }

  login() {
    this.isAdmin = true;
  }

  logout() {
    this.isAdmin = false;
  }
  isLogedIn() {
    return this.isAdmin;
  }
}
