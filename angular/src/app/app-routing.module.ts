import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListCountryComponent } from "./components/list-country/list-country.component";
import { AddCountryComponent } from "./components/add-country/add-country.component";
import { EditCountryComponent } from './components/edit-country/edit-country.component';

const routes: Routes = [
  { path: "", component: ListCountryComponent },
  { path: "add", component: AddCountryComponent },
  { path: "edit", component: EditCountryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
