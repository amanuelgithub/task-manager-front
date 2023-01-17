export interface IActivity {
  id?: string;
  taskId: string;
  description: string;
  status: ActivityStatusEnum;
}

export enum ActivityStatusEnum {
  NOT_STARTED = "NOT_STARTED",
  INPROGRESS = "INPROGRESS",
  COMPLETED = "COMPLETED",
}
