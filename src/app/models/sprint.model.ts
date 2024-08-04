import { SprintBacklogItem } from "./sprint-backlog-item.model";
import { Review } from './review.model';

export interface Sprint {
  id?: string;
  sprintNumber: number;
  sprintStartDate: Date;
  sprintEndDate: Date;
  sprintBacklog: SprintBacklogItem[];
  reviews: Review[];
}
