import {ParagraphsEffects} from './paragraphs/paragraphs.effects';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {ActionReducerMap, MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../../environments/environment';
import {AdjectivesEffects} from './adjectives/adjectives.effects';
import {adjectivesReducer} from './adjectives/adjectives.reducer';
import {AdminEffects} from './admin/admin.effects';
import {AppState, initialAppState} from './app-state';
import {ChaptersEffects} from './chapters/chapters.effects';
import {chaptersReducer} from './chapters/chapters.reducer';
import {CommonEffects} from './common/common.effects';
import {commonMetaReducer} from './common/common.meta-reducer';
import {DecisionTablesEffects} from './decision-tables/decision-tables.effects';
import {decisionTablesReducer} from './decision-tables/decision-tables.reducer';
import {FormsEffects} from './forms/forms.effects';
import {formsReducer} from './forms/forms.reducer';
import {InventoryEffects} from './inventory/inventory.effects';
import {inventoryReducer} from './inventory/inventory.reducer';
import {NounRuleTriggersEffects} from './noun-rule-triggers/noun-rule-triggers.effects';
import {nounRuleTriggersReducer} from './noun-rule-triggers/noun-rule-triggers.reducer';
import {NounsEffects} from './nouns/nouns.effect';
import {nounsReducer} from './nouns/nouns.reducer';
import {RolesEffects} from './roles/roles.effects';
import {rolesReducer} from './roles/roles.reducer';
import {customRouterReducer} from './router/router.reducer';
import {CustomRouterStateSerializer} from './router/router.state';
import {RuleSchedulesEffects} from './rule-schedules/rule-schedules.effects';
import {ruleSchedulesReducer} from './rule-schedules/rule-schedules.reducer';
import {SentencesEffects} from './sentences/sentences.effects';
import {sentencesReducer} from './sentences/sentences.reducer';
import {SkedTemplatesEffects} from './sked-templates/sked-templates.effects';
import {skedTemplatesReducer} from './sked-templates/sked-templates.reducer';
import {SkedsEffects} from './skeds/skeds.effects';
import {skedsReducer} from './skeds/skeds.reducer';
import {TaskRuleTriggersEffects} from './task-rule-triggers/task-rule-triggers.effects';
import {taskRuleTriggersReducer} from './task-rule-triggers/task-rule-triggers.reducer';
import {TasksEffects} from './tasks/tasks.effects';
import {tasksReducer} from './tasks/tasks.reducer';
import {UnitOfMeasuresEffects} from './unit-of-measures/unit-of-measures.effects';
import {unitOfMeasuresReducer} from './unit-of-measures/unit-of-measures.reducer';
import {UsersEffects} from './users/users.effects';
import {usersReducer} from './users/users.reducer';
import {VerbsEffects} from './verbs/verbs.effects';
import {verbsReducer} from './verbs/verbs.reducer';
import {paragraphsReducer} from './paragraphs/paragraphs.reducer';
import {activeUserReducer} from './active-user/active-user.reducer';
import {privilegesReducer} from './privileges/privileges.reducer';
import {PrivilegesEffects} from './privileges/privileges.effects';
import {projectBuilderReducer} from './project-builder/project-builder.reducer';
import {ProjectBuilderEffects} from './project-builder/project-builder.effects';
import {UnsavedChangesConfirmComponent} from './project-builder/unsaved-changes-confirm/unsaved-changes-confirm.component';
import {MatButtonModule} from '@angular/material/button';
import {schedulerReducer} from './scheduler/scheduler.reducer';
import {SchedulerEffects} from './scheduler/scheduler.effects';

const reducers: ActionReducerMap<AppState> = {
  activeUser: activeUserReducer,
  adjectives: adjectivesReducer,
  chapters: chaptersReducer,
  decisionTables: decisionTablesReducer,
  forms: formsReducer,
  inventory: inventoryReducer,
  nounRuleTriggers: nounRuleTriggersReducer,
  nouns: nounsReducer,
  paragraphs: paragraphsReducer,
  privileges: privilegesReducer,
  roles: rolesReducer,
  router: customRouterReducer,
  ruleSchedules: ruleSchedulesReducer,
  projectBuilder: projectBuilderReducer,
  sentences: sentencesReducer,
  scheduler: schedulerReducer,
  skeds: skedsReducer,
  skedTemplates: skedTemplatesReducer,
  taskRuleTriggers: taskRuleTriggersReducer,
  tasks: tasksReducer,
  verbs: verbsReducer,
  unitOfMeasures: unitOfMeasuresReducer,
  users: usersReducer,
};

const metaReducers: MetaReducer<AppState>[] = [commonMetaReducer];

const effects = [
  AdjectivesEffects,
  AdminEffects,
  ChaptersEffects,
  CommonEffects,
  DecisionTablesEffects,
  FormsEffects,
  InventoryEffects,
  NounRuleTriggersEffects,
  NounsEffects,
  ParagraphsEffects,
  PrivilegesEffects,
  RolesEffects,
  RuleSchedulesEffects,
  ProjectBuilderEffects,
  SentencesEffects,
  SchedulerEffects,
  SkedsEffects,
  SkedTemplatesEffects,
  TaskRuleTriggersEffects,
  TasksEffects,
  VerbsEffects,
  UnitOfMeasuresEffects,
  UsersEffects,
];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      initialState: initialAppState,
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: false, // TODO change to true once this is fixed: https://github.com/ngrx/platform/issues/2690,
        strictStateImmutability: false, // TODO change to true once this is fixed: https://github.com/ngrx/platform/issues/2690,
      },
    }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(),
    environment.storeDevtools ? StoreDevtoolsModule.instrument({maxAge: 50, name: `Ophanim NgRx Store`}) : [],
    MatButtonModule,
  ],
  declarations: [UnsavedChangesConfirmComponent],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer,
    },
  ],
})
export class AppStoreModule {}
