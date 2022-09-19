export interface TaskRuleTrigger {
  id?: string;
  displayName?: string;
  ruleId?: string;
  saveReport: boolean;
  taskEvent: string;
  taskId: string;
  triggerActions: boolean;
}
