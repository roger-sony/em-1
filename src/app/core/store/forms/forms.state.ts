import {CadenceForm} from '../../model/form/cadence-form';
import {PlanForm} from '../../model/form/plan-form';
import {TaskForm} from '../../model/form/task-form';
import {TriggerForm} from '../../model/form/trigger-form';
import {ChapterForm} from '../../model/form/chapter-form';

export interface FormsState {
  cadence: CadenceForm;
  plan: PlanForm;
  task: TaskForm;
  trigger: TriggerForm;
  chapter: ChapterForm;
  taskFormEdited: boolean;
}

export const initialFormsState: FormsState = {
  cadence: null,
  plan: null,
  task: null,
  trigger: null,
  chapter: null,
  taskFormEdited: false,
};
