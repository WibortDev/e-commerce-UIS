import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth = false;
  private authListenerSub!: Subscription;

  constructor(private authService: AuthService) {
    this.authListenerSub = this.authService.getAuthListener().subscribe( isAuthenticated => {
      this.isAuth = isAuthenticated;
    } );
  }

  ngOnInit(): void {
  }

  onLogOut(): void {
  }

}
