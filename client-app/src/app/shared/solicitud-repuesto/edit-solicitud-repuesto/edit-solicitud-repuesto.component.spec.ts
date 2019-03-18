import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSolicitudRepuestoComponent } from './edit-solicitud-repuesto.component';

describe('EditSolicitudRepuestoComponent', () => {
  let component: EditSolicitudRepuestoComponent;
  let fixture: ComponentFixture<EditSolicitudRepuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSolicitudRepuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSolicitudRepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
