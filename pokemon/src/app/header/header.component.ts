import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isLogedIn();
  }

  login() {
    this.userService.login();
    this.isAdmin = this.userService.isLogedIn();
  }

  logout() {
    this.userService.logout();
    this.isAdmin = this.userService.isLogedIn();

  }
}
