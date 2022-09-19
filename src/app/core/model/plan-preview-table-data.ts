export interface PlanPreviewTableData {
  noun: string;
  attributes: string[];
  conditions: PlanPreviewCondition[];
  measuredValue: string | number;
  taskTriggered: string;
  lastUpdate: string;
  conditionMet: boolean;
}

export interface PlanPreviewCondition {
  operation?: string;
  value: string | number;
  uom?: string;
}
