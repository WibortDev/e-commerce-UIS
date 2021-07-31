import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel = {
    name: '',
    email: '',
    password: ''
  };

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogIn( form: NgForm ): void {
    if (form.invalid) return;
    this.authService.login(form.value.email, form.value.password);
    form.resetForm();
  }

}
