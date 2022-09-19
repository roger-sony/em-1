export interface NotificationDto {
  // roles: any[]; TODO
  details: NotificationDetailDto[];
  _id: string;
  content: string;
  type: string;
  priority: number;
  createdBy: string;
  created: Date;
  __v: number;
}

export interface NotificationTaskDto {
  _id: string;
  shortTask: string;
}

export interface NotificationRuleDto {
  _id: string;
  displayName: string;
}

export interface NotificationDetailDto {
  tasks: NotificationTaskDto[];
  rules: NotificationRuleDto[];
}
