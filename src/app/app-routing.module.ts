import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:"",component:HomepageComponent},
  {path: "products",component:ProductsComponent, children:[
    { path: '', redirectTo:'list', pathMatch: 'full' },
    {path: 'list', component: ProductsListComponent},
    {path: 'detail/:id', component: ProductDetailComponent}
  ]},
  {path: "categories", component:CategoriesComponent},
  {path: "**", component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
