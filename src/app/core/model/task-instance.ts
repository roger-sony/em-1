import {Paragraph} from './paragraph';
import {Task} from './task';

export interface TaskInstance extends Task {
  start?: Date;
  end?: Date;
  startDateTime: Date;
}

export interface ParagraphInstance extends Paragraph {
  start?: Date;
  end?: Date;
  startDateTime: Date;
}
