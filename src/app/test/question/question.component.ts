import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Question} from '../models/question';
import {Answer} from '../models/answer';
import {ToastrService} from 'ngx-toastr';
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

  constructor(private httpClient: HttpClient,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.isLoading = true;
  }

  radioChange(answer: Answer){
    console.log("MOVE TO NEXT QUESTION");
    console.log(answer);
    this.httpClient.put(this.apiUrl + '/api.php?question_id=' + this.question.id + '&value=' + answer.correct, answer);

    if (answer.correct) {
      this.toastr.success('Respuesta', 'Correcta!', {
        timeOut :  120
      });
      this.nextStep.emit();
    }else{
      this.toastr.error('Respuesta', 'Incorrecta!', {
        timeOut :  120
      });
    }
  }

}
