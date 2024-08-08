export interface NexusProject {
    projectName: string;
    description: string;
    startDate: string;  // ISO date string
    endDate: string;    // ISO date string
    productBacklog: ProductBacklogItem[];
    sprints: Sprint[];
    teams: Team[];
    goals: NexusGoal[];
  }
  
  export interface ProductBacklogItem {
    title: string;
    description?: string;
    priority: string;
    status: string;
  }
  
  export interface Sprint {
    number: number;
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
    backlog: ProductBacklogItem[];
    reviews?: string;
  }
  
  export interface Team {
    name: string;
    roles: string[];
    members: string[];
  }
  
  export interface NexusGoal {
    content: string;
  }
  