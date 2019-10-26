import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Question} from '../models/question';
import {Answer} from '../models/answer';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';

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

    <p [innerText]="correctAnswer"></p>
  `
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Output() nextStep = new EventEmitter();

  correctAnswer = '';
  apiUrl = environment.serverUrl;
  isLoading = false;

  constructor(private httpClient: HttpClient,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.isLoading = true;
  }

  radioChange(answer: Answer) {
    const value = answer.correct ? 1 : 0;

    this.httpClient.get(this.apiUrl + '/api.php?question_id=' + this.question.id + '&value=' + value, {} ).subscribe(done => {
      console.log(done);
    });

    console.log(this.question)

    this.correctAnswer = this.getCorrect();

    let data = null;
    if (answer.correct) {
      this.toastr.success('Correcto', 'Respuesta correcta:' + this.correctAnswer, {
        timeOut :  2250
      });
    } else {
      data = this.question;
      this.toastr.error('Incorrecto', 'Respuesta correcta:' + this.correctAnswer, {
        timeOut :  2250
      });
    }


    setTimeout(function() {
      console.log('wait');
      this.nextStep.emit(data);
    }, 1800);

  }

  getCorrect() {
    for (let answ of this.question.answers) {
      if (answ.correct) {
        return answ.answer+'';
      }
    }
    return '';
  }

}
