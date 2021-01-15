import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditSolicitudComponent } from './edit-solicitud.component';

describe('EditSolicitudComponent', () => {
  let component: EditSolicitudComponent;
  let fixture: ComponentFixture<EditSolicitudComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
