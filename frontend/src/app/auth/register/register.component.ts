import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserModel = {
    name: '',
    email: '',
    password: ''
  };

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignUp(form: NgForm): void {
    if (form.invalid) return;
    this.authService.createUser(form.value);
    form.resetForm();
  }

}
