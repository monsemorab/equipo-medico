import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSolicitudServicioComponent } from './add-edit-solicitud-servicio.component';

describe('AddEditSolicitudServicioComponent', () => {
  let component: AddEditSolicitudServicioComponent;
  let fixture: ComponentFixture<AddEditSolicitudServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSolicitudServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSolicitudServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
