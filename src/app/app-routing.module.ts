import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
