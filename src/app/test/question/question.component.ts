import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Question} from '../models/question';
import {Answer} from '../models/answer';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'question',
  template: `
    <h2>{{question.question}}</h2>

    <mat-radio-group fxLayout="column"
                     fxLayoutGap="1em">
      <mat-radio-button *ngFor="let answer of question.answers; index as i"
                        [value]="i"
                        (change)="radioChange(answer)">
        <span innerHTML="{{answer.answer}}"></span>
      </mat-radio-button>
    </mat-radio-group>

  `
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Output() nextStep = new EventEmitter();

  apiUrl = environment.serverUrl;
  isLoading = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.isLoading = true;
  }

  radioChange(answer: Answer) {


    const value = answer.correct ? 1 : 0;
    console.log("url put:");
    console.log(this.apiUrl + '/api.php?question_id=' + this.question.id + '&value=' + answer.correct);

    this.httpClient.get(this.apiUrl + '/api.php?question_id=' + this.question.id + '&value=' + value, {} ).subscribe(done => {
      console.log(done);
    });

    if (answer.correct) {
      this.nextStep.emit(null);
    } else {
      this.nextStep.emit(this.question);
    }
  }

}
