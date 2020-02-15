import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './shared/table/table.component';
import { ChartComponent } from './shared/chart/chart.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { SearchInputComponent } from './shared/forms/search-input/search-input.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModuleOptions, JwtModule } from '@auth0/angular-jwt';

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: () => localStorage.getItem('token'),
    whitelistedDomains: ['localhost:4200']
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    TableComponent,
    ChartComponent,
    NotFoundComponent,
    PaginationComponent,
    SpinnerComponent,
    SearchInputComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    JwtModule.forRoot(JWT_Module_Options)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
