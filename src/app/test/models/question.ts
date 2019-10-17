import {Answer} from './answer';

export class Question {
  id: number;
  question: string;
  answers: Answer[];
  timesOk: number;
  timesBad: number;

}
