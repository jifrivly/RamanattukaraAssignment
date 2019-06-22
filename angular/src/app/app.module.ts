import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

// Routing Module
import { AppRoutingModule } from "./app-routing.module";

// Components
import { AppComponent } from "./app.component";
import { AddCountryComponent } from "./components/add-country/add-country.component";
import { ListCountryComponent } from "./components/list-country/list-country.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { EditCountryComponent } from './components/edit-country/edit-country.component';

// services
import { CountryService } from "./services/country.service";

@NgModule({
  declarations: [
    AppComponent,
    AddCountryComponent,
    ListCountryComponent,
    HeaderComponent,
    FooterComponent,
    EditCountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
