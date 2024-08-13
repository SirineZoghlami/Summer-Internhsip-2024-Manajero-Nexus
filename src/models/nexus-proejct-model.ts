export interface NexusProject {
    id: string;
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
    reviews?: Review[];
    completed: boolean; 
  }
  
  export interface Review {
    reviewDate: string;  // ISO date string
    reviewContent: string;
  }
  export interface Team {
    id: string;           // Unique identifier for the team
    name: string;         // Name of the team
    description?: string; // Optional description of the team
    members: TeamMember[]; // List of team members
  }
  export interface TeamMember {
    id: string;           // Unique identifier for the team member
    name: string;         // Name of the team member
    role: string;         // Role of the team member within the team
  }
  
  export interface NexusGoal {
    content: string;
  }