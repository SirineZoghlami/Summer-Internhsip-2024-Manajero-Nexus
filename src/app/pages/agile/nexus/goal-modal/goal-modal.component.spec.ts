import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NbDialogRef, NbThemeModule } from '@nebular/theme';
import { GoalModalComponent } from './goal-modal.component';
import { NexusGoal } from '../../../../../models/nexus-proejct-model'; // Adjust the path accordingly

describe('GoalModalComponent', () => {
  let component: GoalModalComponent;
  let fixture: ComponentFixture<GoalModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<NbDialogRef<GoalModalComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('NbDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ GoalModalComponent ],
      imports: [ FormsModule, NbThemeModule.forRoot() ],
      providers: [
        { provide: NbDialogRef, useValue: dialogRefSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize newGoal with default values', () => {
    expect(component.newGoal).toEqual({ content: '' });
  });

  it('should close the dialog with newGoal data on save', () => {
    component.newGoal = { content: 'Test Goal Content' };
    component.save();
    expect(dialogRefSpy.close).toHaveBeenCalledWith({ content: 'Test Goal Content' });
  });

  it('should close the dialog without data on cancel', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should bind input value to newGoal.content', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('#content');
    inputElement.value = 'Updated Goal Content';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.newGoal.content).toBe('Updated Goal Content');
  });

  it('should call save method on form submit', () => {
    spyOn(component, 'save');
    const formElement: HTMLFormElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.save).toHaveBeenCalled();
  });

  it('should call cancel method on cancel button click', () => {
    spyOn(component, 'cancel');
    const cancelButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[status="danger"]');
    cancelButton.click();
    fixture.detectChanges();
    expect(component.cancel).toHaveBeenCalled();
  });
});