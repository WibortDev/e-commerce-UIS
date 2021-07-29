import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormProductComponent } from './components/form-product/form-product.component';
import { LoginComponent } from './components/login/login.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RegisterComponent } from './components/register/register.component';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'products', component: ProductCardComponent },
  { path: 'add', component: FormProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit/:id', component: FormProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
