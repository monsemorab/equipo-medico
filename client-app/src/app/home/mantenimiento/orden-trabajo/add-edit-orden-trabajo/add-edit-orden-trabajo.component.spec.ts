import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOrdenTrabajoComponent } from './add-edit-orden-trabajo.component';

describe('AddEditOrdenTrabajoComponent', () => {
  let component: AddEditOrdenTrabajoComponent;
  let fixture: ComponentFixture<AddEditOrdenTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditOrdenTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
