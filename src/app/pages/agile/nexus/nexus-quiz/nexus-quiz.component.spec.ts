import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbIconModule, NbThemeModule, NbToastrService } from '@nebular/theme';
import { NexusQuizComponent } from './nexus-quiz.component';

describe('NexusQuizComponent', () => {
  let component: NexusQuizComponent;
  let fixture: ComponentFixture<NexusQuizComponent>;
  let toastrService: NbToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NexusQuizComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NbButtonModule,
        NbIconModule,
        NbThemeModule.forRoot()
      ],
      providers: [NbToastrService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NexusQuizComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(NbToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize questions correctly', () => {
    expect(component.questions.length).toBe(10);
    expect(component.questions[0].question).toBe('What is the Nexus framework primarily used for?');
  });

  it('should handle question answer selection', () => {
    const question = component.questions[0];
    component.getResultClass(question, 0);
    expect(component.getUserAnswer(question)).toBe('Not answered');
    question.selectedAnswer = 0;
    expect(component.getUserAnswer(question)).toBe(question.options[0]);
  });

  it('should set showResults to true on submitQuiz', () => {
    component.submitQuiz();
    expect(component.showResults).toBe(true);
  });

  it('should return correct CSS class for correct and wrong answers', () => {
    const question = component.questions[0];
    question.selectedAnswer = 0;
    expect(component.getResultClass(question, 0)).toBe('correct');
    expect(component.getResultClass(question, 1)).toBe('');
    question.selectedAnswer = 1;
    expect(component.getResultClass(question, 1)).toBe('wrong');
  });

  it('should get the correct answer text', () => {
    const question = component.questions[0];
    expect(component.getCorrectAnswer(question)).toBe(question.options[0]);
  });

  it('should display correct answer after submitting the quiz', () => {
    component.questions[0].selectedAnswer = 1; // Incorrect answer
    component.submitQuiz();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.result-item')).toBeTruthy();
    expect(compiled.querySelector('.user-answer')?.textContent).toContain('Not answered');
    expect(compiled.querySelector('.correct-answer')?.textContent).toContain('Scaling Scrum');
  });
});
