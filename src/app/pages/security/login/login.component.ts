import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  toLogin: boolean = true;

  ngOnInit(): void {
      
  }

  switch() {
    this.toLogin = !this.toLogin;
  }
}
