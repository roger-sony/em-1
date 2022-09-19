export interface TaskRuleTriggerDto {
  _id?: string;
  taskEvent: string;
  display_name?: string;
  saveReport: boolean;
  triggerActions: boolean;
  taskId: string;
  ruleId: string;
  __v?: number;
}
