import { Component, OnInit } from "@angular/core";
import { CountryService } from 'src/app/services/country.service';
import { CountryModel } from 'src/app/model/country.model';

@Component({
  selector: "app-list-country",
  templateUrl: "./list-country.component.html",
  styleUrls: ["./list-country.component.css"]
})
export class ListCountryComponent implements OnInit {
  countryList: CountryModel[];
  uri: String = "http://localhost:4545/uploads/"

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.countryService.getCountry().subscribe((countryList) => {
      this.countryList = countryList["data"];
      // var list = this.countryList
    });
  }
}
