import { Routes } from '@angular/router';
import { ProductListComponent } from './components/productList/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product/add-product.component';
import { NotfoundComponent } from './components/NotFound/notfound/notfound.component';

export const routes: Routes = [
    { path: '', component:ProductListComponent},
    { path: 'list', component:ProductListComponent},
    { path: 'add', component:AddProductComponent },
    { path: '**', component:NotfoundComponent }
]