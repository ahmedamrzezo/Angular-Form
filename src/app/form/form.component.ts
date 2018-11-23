import { Component, OnInit } from '@angular/core';
import { Geek } from '../models/geek';
import { PostingService } from '../posting-service/posting.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  cities = ['Cairo', 'Alexandria', 'Other'];

  constructor(private posting: PostingService) {}

  geek = new Geek('', '', '', 'default', false);

  hasCityError = true;

  validateCity(value) {
    if (value === 'default') {
      this.hasCityError = true;
    } else {
      this.hasCityError = false;
    }
    return this.hasCityError;
  }

  submitForm(form: NgForm) {
    if (this.validateCity(this.geek.city)) {
      return document.querySelector('#city').classList.add('is-invalid');
    }
    this.posting.postGeekForm(this.geek)
      .subscribe(
        data => console.log('Success ' + data),
        err => console.error('There were an error' + err)
      );
  }

  ngOnInit() {
    this.posting.getCities().subscribe(
      // data => this.cities = data.cities,
      err => console.error(err)
    );
  }

}
