export interface RuleSchedule {
  id?: string;
  ruleId: string;
  schedule: string;
  triggerActions: boolean;
  saveReport: boolean;
  displayName: string;
  startDate?: Date;
  endDate?: Date;
  numberOfSkeds?: number;
}
