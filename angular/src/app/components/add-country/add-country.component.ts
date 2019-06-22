import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { CountryModel } from "src/app/model/country.model";
import { CountryService } from "src/app/services/country.service";


@Component({
  selector: "app-add-country",
  templateUrl: "./add-country.component.html",
  styleUrls: ["./add-country.component.css"]
})

export class AddCountryComponent implements OnInit {
  addCountryForm: FormGroup;
  countryData: CountryModel;
  countryName: any[];
  countryFlag: File;

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
  ) { }

  ngOnInit() {
    this.addCountryForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      code: ["", [Validators.required]],
      currency: ["", [Validators.required]],
      status: ["", [Validators.required]]
    });

    this.countryService.getCountryName().subscribe((countryName) => {
      this.countryName = countryName;
    });
  }


  // selecting file from form
  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      console.log(event.target.files);
      this.countryFlag = <File>event.target.files[0];
    }
  }


  // country data adding
  addCountry(): void {

    this.countryData = this.addCountryForm.value;
    console.log("Data : " + JSON.stringify(this.countryData));
    // alert(JSON.stringify(this.countryData));

    this.countryService.addCountry(this.countryData)
      .subscribe((data) => {
        console.log("Service worked and suscribed..." + JSON.stringify(data));

        console.log("File upload service function working...");
        const formData = new FormData();
        formData.append("countryFlag", this.countryFlag, this.countryFlag.name);
        this.countryService.upload(formData).subscribe((data) => {
          console.log("File Uploaded..." + JSON.stringify(data));
        });
      });


  }


  // End.............

}
