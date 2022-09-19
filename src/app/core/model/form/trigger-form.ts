import {TaskEvent} from '../task-event';
import {TriggerFormType} from './trigger-form-type';

export interface TriggerForm {
  type: TriggerFormType;
  noun?: NounTriggerForm;
  task?: TaskTriggerForm;
  saveReport: boolean;
  triggerActions: boolean;
  page?: TriggerFormPage;
}

export interface NounTriggerForm {
  id: string;
  displayName: string;
}

export interface TaskTriggerForm {
  id: string;
  displayName: string;
  event: TaskEvent | '';
}

export enum TriggerFormPage {
  AddTrigger = 'AddTrigger',
  EditTrigger = 'EditTrigger',
  CreatePlan = 'CreatePlan',
}

export const DEFAULT_TRIGGER_FORM_VALUE: TriggerForm = {
  type: TriggerFormType.Noun,
  noun: {
    id: '',
    displayName: '',
  },
  task: {
    id: '',
    displayName: '',
    event: '',
  },
  saveReport: false,
  triggerActions: true,
};
