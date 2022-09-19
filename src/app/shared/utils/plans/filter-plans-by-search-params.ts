import {SearchParams} from '../../../core/model/search/search-params';
import {DecisionTable} from '../../../core/model/decision-table';
import {NounRuleTrigger} from '../../../core/model/noun-rule-trigger';
import {TaskRuleTrigger} from '../../../core/model/task-rule-trigger';
import {RuleSchedule} from '../../../core/model/rule-schedule';

function getNounCount(plan: DecisionTable): DecisionTable {
  plan.nounCount = plan.rules.length;
  return plan;
}

function getConditionCount(plan: DecisionTable): DecisionTable {
  let rules = 0;
  plan.rules.forEach(rule => (rules += rule.factFilters.length));
  plan.conditionCount = plan.facts.length + rules;
  return plan;
}

function getTriggerCount(
  plan: DecisionTable,
  nounTriggers: NounRuleTrigger[],
  taskTriggers: TaskRuleTrigger[]
): DecisionTable {
  nounTriggers.forEach(n => {
    if (n.ruleId === plan.id) {
      plan.triggerCount += 1;
    }
  });
  taskTriggers.forEach(t => {
    if (t.ruleId === plan.id) {
      plan.triggerCount += 1;
    }
  });
  return plan;
}

function getCadences(plan: DecisionTable, ruleSchedules: RuleSchedule[]): DecisionTable {
  plan.cadences = ruleSchedules.filter(r => r.ruleId === plan.id);
  return plan;
}

function insertPlanCounts(
  plans: DecisionTable[],
  nounTriggers: NounRuleTrigger[],
  taskTriggers: TaskRuleTrigger[],
  ruleSchedules: RuleSchedule[]
): DecisionTable[] {
  const plansWithCounts: DecisionTable[] = plans.map(plan => {
    plan = getNounCount(plan);
    plan = getConditionCount(plan);
    plan = getTriggerCount(plan, nounTriggers, taskTriggers);
    plan = getCadences(plan, ruleSchedules);
    return plan;
  });
  return plansWithCounts;
}

export function filterPlansBySearchParamsGetCounts(
  plans: DecisionTable[],
  searchParams: SearchParams,
  nounTriggers: NounRuleTrigger[],
  taskTriggers: TaskRuleTrigger[],
  ruleSchedules: RuleSchedule[]
): DecisionTable[] {
  const plansWithCounts: DecisionTable[] = insertPlanCounts(plans, nounTriggers, taskTriggers, ruleSchedules);
  return filterPlansBySearchParams(plansWithCounts, searchParams);
}

export function filterPlansBySearchParams(plans: DecisionTable[], searchParams: SearchParams): DecisionTable[] {
  const {text, chapterIds, sortDirection, empty} = searchParams || {};
  const filteredPlans = (plans || [])
    .filter(plan => !text || plan.displayName?.toLowerCase().includes(text.toLowerCase()))
    .filter(plan => !chapterIds?.length || chapterIds.every(chapterId => plan.chapterIds?.includes(chapterId)))
    .filter(
      plan => !empty || (!plan.conditionCount && !plan.triggerCount && !plan.nounCount && !plan.cadences?.length)
    );
  const sortField = searchParams?.sortField || 'displayName';

  // tslint:disable-next-line:no-any
  return filteredPlans.sort((a: Record<string, any>, b: Record<string, any>) => {
    if (Number.isInteger(a[sortField]) && Number.isInteger(b[sortField])) {
      return (a[sortField] - b[sortField]) * (sortDirection === 'desc' ? -1 : 1);
    } else {
      return String(a[sortField] || '').localeCompare(String(b[sortField] || '')) * (sortDirection === 'desc' ? -1 : 1);
    }
  });
}
