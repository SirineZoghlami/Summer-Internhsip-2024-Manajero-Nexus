export interface Project {
  id?: string;  // Optional since IDs are auto-generated
  projectName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  productBacklog: ProductBacklogItem[];
  sprints: Sprint[];
  teams: Team[];
  goals: NexusGoal[];
}

export interface ProductBacklogItem {
  title: string;
  description: string;
  priority: string;
  status: string;
}

export interface Sprint {
  number: number;
  startDate: Date;
  endDate: Date;
  backlog: ProductBacklogItem[];
  reviews: string;
}

export interface Team {
  name: string;
  roles: string[];
  members: string[];
}

export interface NexusGoal {
  id?: string;  // Optional since IDs are auto-generated
  content: string;
}
