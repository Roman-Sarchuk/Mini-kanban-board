export const EVENTS = {
  COLUMN_ADDED: "column_added",
  COLUMN_UPDATED: "column_updated",
  COLUMN_DELETED: "column_deleted",
  COLUMN_MOVED: "column_moved",
  TASK_CREATED: "task_created",
  TASK_UPDATED: "task_updated",
  TASK_DELETED: "task_deleted",
  TASK_MOVED: "task_moved",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];
