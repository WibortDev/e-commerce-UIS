import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { FormProductComponent } from './components/form-product/form-product.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RegisterComponent } from './auth/register/register.component';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'products', component: ProductCardComponent },
  { path: 'add', component: FormProductComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: FormProductComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})

export class AppRoutingModule { }
