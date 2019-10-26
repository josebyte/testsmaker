import {Answer} from './answer';

export class Question {
  id: number;
  question: string;
  answers: Answer[];
  timesOk: number;
  timesBad: number;

  getCorrect() {
    for (let answ of this.answers) {
      if (answ.correct) {
        return answ;
      }
    }
    return null;
  }

}
