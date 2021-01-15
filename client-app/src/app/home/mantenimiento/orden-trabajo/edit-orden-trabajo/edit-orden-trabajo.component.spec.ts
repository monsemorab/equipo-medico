import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditOrdenTrabajoComponent } from './edit-orden-trabajo.component';

describe('EditOrdenTrabajoComponent', () => {
  let component: EditOrdenTrabajoComponent;
  let fixture: ComponentFixture<EditOrdenTrabajoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrdenTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
