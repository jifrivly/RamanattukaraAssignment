import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { CountryService } from 'src/app/services/country.service';

import { CountryModel } from 'src/app/model/country.model';

@Component({
  selector: "app-list-country",
  templateUrl: "./list-country.component.html",
  styleUrls: ["./list-country.component.css"]
})
export class ListCountryComponent implements OnInit {
  countryList: CountryModel[] = [];
  countryListFound: boolean;
  uri: string = "http://localhost:4545/uploads/";

  constructor(
    private countryService: CountryService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.countryService.getCountry().subscribe((countryList) => {
      this.countryList = countryList.data;

      if (countryList.success == false || this.countryList.length < 1) {
        this.countryListFound = false;
      } else {
        this.countryListFound = true;
      }
    });
  }


  // Delete Country
  delete(id) {
    this.countryService.deleteCountry(id).subscribe(
      (result) => {
        console.log("Deleted successfully" + result);
        this.ngOnInit();
      }
    );
  }


  //Edit Country
  edit(id) {
    this._router.navigate(["edit"], { queryParams: { id } })
      .then((result) => {
        console.log("Link going to edit route..");
      })
      .catch((err) => {
        console.log("An error occurred while navigating..");
      })
  }


  // end
}
