import {ParagraphsState, initialParagraphsState} from './paragraphs/paragraphs.state';
import {SentencesState, initialSentencesState} from './sentences/sentences.state';
import {VerbsState, initialVerbsState} from './verbs/verbs.state';
import {AdjectivesState, initialAdjectivesState} from './adjectives/adjectives.state';
import {ChaptersState, initialChaptersState} from './chapters/chapters.state';
import {DecisionTablesState, initialDecisionTablesState} from './decision-tables/decision-tables.state';
import {FormsState, initialFormsState} from './forms/forms.state';
import {initialInventoryState, InventoryState} from './inventory/inventory.state';
import {initialNounRuleTriggersState, NounRuleTriggersState} from './noun-rule-triggers/noun-rule-triggers.state';
import {initialRolesState, RolesState} from './roles/roles.state';
import {CustomRouterReducerState} from './router/router.state';
import {initialRuleSchedulesState, RuleSchedulesState} from './rule-schedules/rule-schedules.state';
import {initialSkedTemplatesState, SkedTemplatesState} from './sked-templates/sked-templates.state';
import {initialSkedsState, SkedsState} from './skeds/skeds.state';
import {initialTaskRuleTriggersState, TaskRuleTriggersState} from './task-rule-triggers/task-rule-triggers.state';
import {initialTasksState, TasksState} from './tasks/tasks.state';
import {initialUnitOfMeasuresState, UnitOfMeasuresState} from './unit-of-measures/unit-of-measures.state';
import {initialUsersState, UsersState} from './users/users.state';
import {initialNounsState, NounsState} from './nouns/nouns.state';
import {initialActiveUserState, ActiveUserState} from './active-user/active-user.state';
import {initialPrivilegesState, PrivilegesState} from './privileges/privileges.state';
import {initialProjectBuilderState, ProjectBuilderState} from './project-builder/project-builder.state';
import {initialSchedulerState, SchedulerState} from './scheduler/scheduler.state';

export interface AppState {
  activeUser: ActiveUserState;
  adjectives: AdjectivesState;
  chapters: ChaptersState;
  decisionTables: DecisionTablesState;
  forms: FormsState;
  inventory: InventoryState;
  nounRuleTriggers: NounRuleTriggersState;
  nouns: NounsState;
  paragraphs: ParagraphsState;
  privileges: PrivilegesState;
  roles: RolesState;
  router: CustomRouterReducerState;
  ruleSchedules: RuleSchedulesState;
  projectBuilder: ProjectBuilderState;
  scheduler: SchedulerState;
  sentences: SentencesState;
  skeds: SkedsState;
  skedTemplates: SkedTemplatesState;
  taskRuleTriggers: TaskRuleTriggersState;
  tasks: TasksState;
  verbs: VerbsState;
  unitOfMeasures: UnitOfMeasuresState;
  users: UsersState;
}

export function initialAppState(): AppState {
  return {
    activeUser: initialActiveUserState,
    adjectives: initialAdjectivesState,
    chapters: initialChaptersState,
    decisionTables: initialDecisionTablesState,
    forms: initialFormsState,
    inventory: initialInventoryState,
    nounRuleTriggers: initialNounRuleTriggersState,
    nouns: initialNounsState,
    paragraphs: initialParagraphsState,
    privileges: initialPrivilegesState,
    roles: initialRolesState,
    router: null,
    ruleSchedules: initialRuleSchedulesState,
    projectBuilder: initialProjectBuilderState,
    sentences: initialSentencesState,
    scheduler: initialSchedulerState,
    skeds: initialSkedsState,
    skedTemplates: initialSkedTemplatesState,
    taskRuleTriggers: initialTaskRuleTriggersState,
    tasks: initialTasksState,
    unitOfMeasures: initialUnitOfMeasuresState,
    verbs: initialVerbsState,
    users: initialUsersState,
  };
}
