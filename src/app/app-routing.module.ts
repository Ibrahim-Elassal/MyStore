import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {path: 'productList' , component: ProductListComponent},
  {path:  "" , redirectTo : "productList" , pathMatch : "full" } ,
  {path: 'cart' , component: CartComponent},
  {path: 'productdetails/:id' , component: ProductItemDetailComponent},
  {path: 'confirmOrder' , component: ConfirmationComponent},
  {path: '**' , component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
