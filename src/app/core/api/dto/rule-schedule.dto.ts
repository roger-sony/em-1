export interface RuleScheduleDto {
  _id?: string;
  rule: string;
  schedule: string;
  triggerActions: boolean;
  saveReport: boolean;
  displayName: string;
  startDate?: string;
  endDate?: string;
  numberOfSkeds?: number;
  __v?: number;
}
