import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HeaderComponent } from './pages/header/header.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { FavoriteProductComponent } from './components/favorite-product/favorite-product.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule( {
  declarations: [
    AppComponent,
    FormProductComponent,
    ProductCardComponent,
    HeaderComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    FavoriteProductComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
} )

export class AppModule { }
