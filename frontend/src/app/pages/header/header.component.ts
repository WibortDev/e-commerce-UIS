import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
} )

export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  isAdmin = false;
  private authListenerSub!: Subscription;
  private adminListenerSub!: Subscription;

  constructor(private authService: AuthService) {
    this.isAuth = authService.getIsAuthenticated();
    this.isAdmin = authService.getIsAdmin();

    this.authListenerSub = this.authService.getAuthListener().subscribe( isAuthenticated => {
      this.isAuth = isAuthenticated;
    } );

    this.adminListenerSub = this.authService.getAdminListener().subscribe( isAdmin => {
      this.isAdmin = isAdmin;
    } );
  }

  ngOnInit(): void {
  }

  onLogOut(): void {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.authListenerSub.unsubscribe();
    this.adminListenerSub.unsubscribe();
  }

}
