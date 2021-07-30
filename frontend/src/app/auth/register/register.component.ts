import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';

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

  constructor() { }

  ngOnInit(): void {
  }

  onSignUp(form: NgForm): void {
    console.log(form);
  }
}
