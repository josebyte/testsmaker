import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Question} from './test/models/question';
import {environment} from '../environments/environment';
import {ToastrService} from 'ngx-toastr';

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
              private fb: FormBuilder,
              private toastr: ToastrService) {
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
      this.oks = 0;
      this.bads = 0;
      this.isLoading = false;

    });
  }

  moveNext(value) {
    console.log(value);

    if (value) {
      this.bads++;
      this.toastr.error('Respuesta', 'Incorrecta!', {
        timeOut :  860
      });
      this.review.push(value);
    } else {
      this.oks++;
      this.toastr.success('Respuesta', 'Correcta!', {
        timeOut :  860
      });
    }


    console.log(this.stepper);


    if (this.stepper.selectedIndex + 1 >= this.stepper.steps.length) {
      this.showResults();
    } else {
      this.stepper.next();
    }

  }

  reDo(){
    this.questions = this.review;
  }

  startTest(id: number) {
    this.getTest(id);
  }

  showResults() {
    this.results = !this.results;
  }


}
