export interface SkedTemplate {
  id?: string;
  displayName: string;
  skedId?: number;
  startTime?: string;
  endTime?: string;
  assignedEmployees?: number;
  tasks?: SkedTemplateTask[];
  balanced?: boolean;
}

export interface SkedTemplateTask {
  id: string;
  displayName: string;
  status: string;
  weight: number;
  weightedDuration: number;
}
