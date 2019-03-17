import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSolicitudRepuestoComponent } from './add-edit-solicitud-repuesto.component';

describe('AddEditSolicitudRepuestoComponent', () => {
  let component: AddEditSolicitudRepuestoComponent;
  let fixture: ComponentFixture<AddEditSolicitudRepuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSolicitudRepuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSolicitudRepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
