import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NbDialogRef, NbCardModule, NbButtonModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { NexusProductBacklogModalComponent } from './nexus-product-backlog-modal.component';
import { By } from '@angular/platform-browser';

describe('NexusProductBacklogModalComponent', () => {
  let component: NexusProductBacklogModalComponent;
  let fixture: ComponentFixture<NexusProductBacklogModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<NbDialogRef<NexusProductBacklogModalComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('NbDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [NexusProductBacklogModalComponent],
      imports: [FormsModule, NbCardModule, NbButtonModule, NbInputModule, NbSelectModule],
      providers: [
        { provide: NbDialogRef, useValue: dialogRefSpy },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NexusProductBacklogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize newBacklog with default values', () => {
    expect(component.newBacklog).toEqual({
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Pending',
    });
  });

  it('should close the dialog with new backlog data on save', () => {
    component.newBacklog = {
      title: 'Test Backlog Item',
      description: 'This is a test description.',
      priority: 'High',
      status: 'In Progress',
    };

    component.save();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(component.newBacklog);
  });

  it('should close the dialog without data on cancel', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });

  it('should call save method when Save button is clicked', () => {
    spyOn(component, 'save');
    const saveButton = fixture.debugElement.query(By.css('button[status="primary"]'));
    saveButton.triggerEventHandler('click', null);
    expect(component.save).toHaveBeenCalled();
  });

  it('should call cancel method when Cancel button is clicked', () => {
    spyOn(component, 'cancel');
    const cancelButton = fixture.debugElement.query(By.css('button[status="danger"]'));
    cancelButton.triggerEventHandler('click', null);
    expect(component.cancel).toHaveBeenCalled();
  });
});
