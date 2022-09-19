export interface NounRuleTriggerDto {
  _id?: string;
  ruleId: string;
  nounSubcategory: string;
  triggerActions: boolean;
  saveReport: boolean;
  displayName?: string;
  __v?: number;
}
