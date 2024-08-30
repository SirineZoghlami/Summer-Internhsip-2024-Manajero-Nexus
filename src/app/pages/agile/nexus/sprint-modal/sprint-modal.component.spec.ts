import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { SprintModalComponent } from './sprint-modal.component';
import { Sprint } from '../../../../core/models/nexus-models/nexus-proejct-model';

describe('SprintModalComponent', () => {
  let component: SprintModalComponent;
  let fixture: ComponentFixture<SprintModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<NbDialogRef<SprintModalComponent>>;

  beforeEach(async () => {
    const dialogRefSpyObj = jasmine.createSpyObj('NbDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [SprintModalComponent],
      imports: [FormsModule],
      providers: [
        { provide: NbDialogRef, useValue: dialogRefSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SprintModalComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(NbDialogRef) as jasmine.SpyObj<NbDialogRef<SprintModalComponent>>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize newSprint with default values', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(component.newSprint).toEqual({
      number: 0,
      startDate: today,
      endDate: today,
      completed: false
    });
  });

  it('should close dialog with newSprint data on save', () => {
    component.newSprint = {
      number: 1,
      startDate: '2023-01-01',
      endDate: '2023-01-15',
      completed: false
    };
    component.save();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(component.newSprint);
  });

  it('should close dialog without data on cancel', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});