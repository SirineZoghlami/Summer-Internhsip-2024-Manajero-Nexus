import { Component } from '@angular/core';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer?: number;
}

@Component({
  selector: 'app-nexus-quiz',
  templateUrl: './nexus-quiz.component.html',
  styleUrls: ['./nexus-quiz.component.scss']
})
export class NexusQuizComponent {
  questions: Question[] = [
    {
      question: 'What is the Nexus framework primarily used for?',
      options: ['Scaling Scrum', 'Kanban implementation', 'Waterfall development', 'Extreme Programming'],
      correctAnswer: 0
    },
    {
      question: 'Who typically coordinates the Nexus integration team?',
      options: ['Project Manager', 'Scrum Master', 'Nexus Integration Team', 'Product Owner'],
      correctAnswer: 2
    },
    {
      question: 'How many Scrum teams can a Nexus framework scale up to?',
      options: ['Up to 3 teams', 'Up to 5 teams', 'Up to 9 teams', 'Up to 15 teams'],
      correctAnswer: 2
    },
    {
      question: 'Which event is unique to the Nexus framework?',
      options: ['Nexus Sprint Planning', 'Daily Stand-up', 'Sprint Review', 'Sprint Retrospective'],
      correctAnswer: 0
    },
    {
      question: 'What is the primary goal of the Nexus Integration Team?',
      options: ['Manage the product backlog', 'Resolve dependencies and integration issues', 'Facilitate Scrum events', 'Develop features'],
      correctAnswer: 1
    },
    {
      question: 'In Nexus, what artifact provides visibility into the integration effort?',
      options: ['Product Backlog', 'Sprint Backlog', 'Integrated Increment', 'Nexus Goal'],
      correctAnswer: 3
    },
    {
      question: 'What role does the Nexus Integration Team NOT perform?',
      options: ['Coordinate work', 'Coach teams', 'Resolve conflicts', 'Perform development tasks'],
      correctAnswer: 3
    },
    {
      question: 'Which of the following is a responsibility of the Nexus Integration Team?',
      options: ['Perform all coding tasks', 'Ensure integration of work is achieved', 'Manage individual team sprints', 'Assign work to teams'],
      correctAnswer: 1
    },
    {
      question: 'What should be the primary focus during Nexus Sprint Planning?',
      options: ['Task assignments', 'Nexus Sprint Goal', 'Product Backlog refinement', 'Individual performance'],
      correctAnswer: 1
    },
    {
      question: 'What is a key benefit of using Nexus?',
      options: ['Reduces need for communication', 'Simplifies project management', 'Improves product quality through integrated increments', 'Eliminates the need for Scrum Masters'],
      correctAnswer: 2
    }
  ];

  showResults: boolean = false;

  submitQuiz() {
    this.showResults = true;
  }

  getResultClass(question: Question, optionIndex: number): string {
    if (!this.showResults) {
      return '';
    }
    if (optionIndex === question.correctAnswer) {
      return 'correct';
    }
    if (optionIndex === question.selectedAnswer) {
      return 'wrong';
    }
    return '';
  }

  getUserAnswer(question: Question): string {
    return question.options[question.selectedAnswer || -1] || 'Not answered';
  }

  getCorrectAnswer(question: Question): string {
    return question.options[question.correctAnswer];
  }
}
