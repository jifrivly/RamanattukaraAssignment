import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { CountryModel } from 'src/app/model/country.model';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css']
})
export class EditCountryComponent implements OnInit {

  id;
  country: CountryModel;
  dataFound: boolean = false;
  editCountryForm: FormGroup;
  countryName: any[];
  countryData: CountryModel;
  countryFlag: File = null;
  message: string = "";

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private countryService: CountryService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.editCountryForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      code: ["", [Validators.required]],
      currency: ["", [Validators.required]],
      status: ["", [Validators.required]]
    });


    this._route.queryParams.subscribe((params) => {
      this.id = params.id;
      this.countryService.getCountryById(this.id).subscribe((result) => {
        this.dataFound = true;
        this.country = result.data;
        console.log("Country getted" + JSON.stringify(this.country));

        // this.editCountryForm = this.formBuilder.group({
        //   name: [this.country.name, [Validators.required]],
        //   code: [this.country.code, [Validators.required]],
        //   currency: [this.country.currency, [Validators.required]],
        //   status: [this.country.status, [Validators.required]]
        // });

        this.editCountryForm.get("name").setValue(this.country.name);
        console.log("Name : " + this.editCountryForm.get("name").value);
        this.editCountryForm.get("code").setValue(this.country.code);
        this.editCountryForm.get("currency").setValue(this.country.currency);
        this.editCountryForm.get("status").setValue(this.country.status);

      });
    });

    this.countryService.getCountryName().subscribe((result) => {
      this.countryName = result;
    });

  }


  // selecting file from form
  onChangeFile(event) {
    if (event.target.files.length > 0) {
      console.log(event.target.files);
      this.countryFlag = <File>event.target.files[0];
    }
  }


  // country data updating
  updateCountry(): void {
    var newCountryData = [];
    var changed = false;

    var name = this.editCountryForm.get("name").value;
    var code = this.editCountryForm.get("code").value;
    var currency = this.editCountryForm.get("currency").value;
    var status = this.editCountryForm.get("status").value;


    console.log(name + this.country.name + (name !== this.country.name));
    if (name !== this.country.name) {
      changed = true;
      newCountryData.push({ name: name });
    }
    if (code != this.country.code) {
      changed = true;
      newCountryData.push({ code: code });
    }
    if (currency != this.country.currency) {
      changed = true;
      newCountryData.push({ currency: currency });
    }
    if (status != this.country.status) {
      changed = true;
      newCountryData.push({ status: status });
    }

    // console.log("Data : " + JSON.stringify(newCountryData.getAll("name")));
    // console.log("Data : " + JSON.stringify(newCountryData.getAll("code")));
    // console.log("Data : " + JSON.stringify(newCountryData.getAll("currency")));
    // console.log("Data : " + JSON.stringify(newCountryData.getAll("status")));


    if (!changed) {
      this.message = "No data changed to update... please change or go back..";
    } else {

      console.log(newCountryData);

      this.message = "Country values are Successfully changed";
      this.countryService.editCountry(this.id, newCountryData)
        .subscribe((data) => {
          console.log("Service worked and suscribed..." + JSON.stringify(data));

          //     if (this.countryFlag != null) {
          //       console.log("File upload service function working...");
          //       var formData = new FormData();
          //       formData.append("countryFlag", this.countryFlag, this.countryFlag.name);
          //       this.countryService.upload(formData).subscribe((data) => {
          //         console.log("File Uploaded..." + JSON.stringify(data));
          //       });
          //     }

        });
    }



  }



}
