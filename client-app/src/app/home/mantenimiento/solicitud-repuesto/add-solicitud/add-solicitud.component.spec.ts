import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddSolicitudComponent } from './add-solicitud.component';

describe('AddSolicitudComponent', () => {
  let component: AddSolicitudComponent;
  let fixture: ComponentFixture<AddSolicitudComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
