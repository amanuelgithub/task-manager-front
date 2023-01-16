export interface IActivity {
  description: string;
  status: ActivityStatusEnum;
}

export enum ActivityStatusEnum {
  NOT_STARTED = "NOT_STARTED",
  INPROGRESS = "INPROGRESS",
  COMPLETED = "COMPLETED",
}
