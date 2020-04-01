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
    this.isAdmin = this.userService.isAdmin;
  }

  login() {
    this.userService.login();
    this.isAdmin = this.userService.isAdmin;
    // const name = 'bulbasaur'
    // this.router.navigateByUrl(`/list/${name}`);

  }

  logout() {
    this.userService.logout();
    this.isAdmin = this.userService.isAdmin;

  }
}
