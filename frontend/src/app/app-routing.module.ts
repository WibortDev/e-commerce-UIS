import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { NoAuthGuard } from './auth/guards/no-auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';

import { FormProductComponent } from './components/form-product/form-product.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RegisterComponent } from './auth/register/register.component';
import { IndexComponent } from './pages/index/index.component';
import { FavoriteProductComponent } from './components/favorite-product/favorite-product.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'products', component: ProductCardComponent },
  { path: 'add', component: FormProductComponent, canActivate: [AdminGuard] },
  { path: 'edit/:id', component: FormProductComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'fav', component: FavoriteProductComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    NoAuthGuard,
    AdminGuard
  ]
})

export class AppRoutingModule { }
