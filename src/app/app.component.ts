import {Component, OnInit, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Question} from './test/models/question';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  @ViewChildren('stepper') stepper: any;

  apiUrl = environment.serverUrl;
  formGroups: Array<FormGroup> = [];
  form: FormGroup;
  isLoading = false;
  tests: any = [];
  questions: Question[];

  constructor(private httpClient: HttpClient,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getTests().subscribe(tests => {
      this.tests = tests;
    });
  }

  public getTests() {
    return this.httpClient.get(this.apiUrl + '/api.php');
  }

  public getTest(id: number) {
    this.isLoading = true;

    this.httpClient.get(this.apiUrl + '/api.php?id=' + id).subscribe((questions: Question[]) => {
      this.questions = questions;
      for (let i = 0; i < this.questions.length; i++) {
        const group = this.fb.group({});
        group.addControl('' + i, new FormControl(i, Validators.required));
        this.formGroups.push(group);
      }
      this.isLoading = false;

    });
  }

  moveNext(stepper: MatStepper) {
    stepper.next();
  }

  startTest(id: number) {
    this.getTest(id);
  }

  review() {
    /*
    for(let q of questions){

    }*/
  }
}
