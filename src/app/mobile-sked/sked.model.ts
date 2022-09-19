export interface SkedModel {
  allDay: boolean;
  assignedEmployees: number;
  backgroundColor: string;
  balanced: boolean;
  borderColor: string;
  classNames: string;
  display: string;
  editable: boolean;
  end: string;
  overlap: boolean;
  paragraphs: ParagraphModel[];
  skedData: SkedDataModel;
  start: string;
  status: string;
  tasks: TaskModel[];
  textColor: string;
  title: string;
  __v: number;
  _dateCreated: string;
  _id: string;
  _version: number;
}

export interface SkedDataModel {
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
}

export interface TaskModel {
  [key: string]: string | number | string[] | number[] | boolean;
}

export interface ParagraphModel {
  assignedTo: string[];
  assignedToUser: string[];
  derivedEffort: number;
  instanceID: string;
  lexicon: string;
  movability: number;
  name: string;
  pauses?: {
    startPause: string;
    endPause: string;
  }[];
  priority: number;
  schedule: SkeduleModel[];
  score: number;
  sentences: SentenceModel[];
  startedAt: string | Date;
  startDateTime?: string;
  status: string;
  __v: number;
  _id: string;
}

export interface SkeduleModel {
  custom: string;
  end: string;
  repetition: string;
  startDateTime: string;
}

export interface SentenceModel {
  effort: number;
  movability: number;
  noun: NounModel;
  priority: number;
  verb: VerbModel;
  status?: string;
}

interface NounModel {
  active: true;
  adjectives: AdjectiveModel[];
  id: string;
  name: string;
}

export interface AdjectiveModel {
  lexicon: string;
  name: string;
  numeric: boolean;
  options: string[];
  resetValue: string;
  type: string;
  unitOfMeasure: string;
  updateable: boolean;
  validation: string;
  value: string | string[];
  _id: string;
}

interface VerbModel {
  description: string;
  id: string;
  name: string;
}

export interface UserModel {
  username: string;
  roles: string[];
  _id: string;
  __v: number;
}
