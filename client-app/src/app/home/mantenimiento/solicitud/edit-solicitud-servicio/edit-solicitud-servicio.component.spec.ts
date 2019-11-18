import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSolicitudServicioComponent } from './edit-solicitud-servicio.component';

describe('EditSolicitudServicioComponent', () => {
  let component: EditSolicitudServicioComponent;
  let fixture: ComponentFixture<EditSolicitudServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSolicitudServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSolicitudServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
