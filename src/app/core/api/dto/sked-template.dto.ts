export interface SkedTemplateDto {
  _id: string;
  displayName: string;
  _SkedID: number;
  _StartTime: string;
  _EndTime: string;
  assignedEmployees: number;
  tasks: SkedTemplateTaskDto[];
  balanced?: boolean;
}

export interface SkedTemplateTaskDto {
  _id: string;
  displayName: string;
  status: string;
  weight: number;
  weightedDuration: number;
}
