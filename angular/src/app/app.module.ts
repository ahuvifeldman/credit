import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms"; 
import { HomeComponent } from './home/home.component';
import { RouterModule, Route } from '@angular/router';
import { CreditComponent } from './credit/credit.component';
import { CreditService } from './service/service-credit.service';


/* const APP_ROUTES: Route[] = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent }
] */

@NgModule({
   //components
	//direcive
	//pipe
	declarations: [
      AppComponent,
      CreditComponent
   ],
   //modules
	imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule

   ],
   providers: [CreditService],
   bootstrap: [AppComponent],
})
export class AppModule { }
