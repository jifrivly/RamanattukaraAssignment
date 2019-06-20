import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListContryComponent } from "./components/list-contry/list-contry.component";
import { AddContryComponent } from "./components/add-contry/add-contry.component";

const routes: Routes = [
  { path: "", component: ListContryComponent },
  { path: "add", component: AddContryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
