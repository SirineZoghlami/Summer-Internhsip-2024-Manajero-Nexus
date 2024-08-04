export interface NexusIntegrationTeam {
    id?: string;       // Optional if not provided by the client (for new teams)
    teamName: string;  // Maps to `teamName` in Spring Boot model
    roles: string;     // Maps to `roles` in Spring Boot model
    members: string;   // Maps to `members` in Spring Boot model
  }
  