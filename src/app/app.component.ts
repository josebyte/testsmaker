import {Component, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('matstepper', {static: false}) stepper: MatStepper;

  apiUrl = environment.serverUrl;
  formGroups: Array<FormGroup> = [];
  form: FormGroup;
  isLoading = false;
  tests: any = [];
  questions: Question[];

  results = false;
  oks = 0;
  bads = 0;
  review = [];

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

    this.httpClient.get(this.apiUrl + '/api.php?id=' + id).subscribe((questions: Question[]) => {
      this.questions = questions;
      this.shuffle();
      //this.addQuestions();
    });
  }

  shuffle() {
    console.log(this.questions);
    let a = this.questions;
    let j;
    let x;
    let i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    this.questions = a;
    console.log(this.questions);
    this.addQuestions();
  }

  private addQuestions() {
    this.formGroups = [];

    for (let i = 0; i < this.questions.length; i++) {
      const group = this.fb.group({});
      group.addControl('' + i, new FormControl(i, Validators.required));
      this.formGroups.push(group);
    }

    this.oks = 0;
    this.bads = 0;
    this.isLoading = false;
  }

  moveNext(value: Question) {
    if (value) {
      this.bads++;
      this.review.push(value);
    } else {
      this.oks++;
    }

    if (this.stepper.selectedIndex + 1 >= this.stepper.steps.length) {
      this.showResults();
    } else {
      this.stepper.next();
    }

  }

  reDo() {
    this.questions = this.review;
  }

  startTest(id: number) {
    this.getTest(id);
  }

  showResults() {
    this.results = !this.results;
  }


}
