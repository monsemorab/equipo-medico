import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSolicitudServicioComponent } from './add-solicitud-servicio.component';

describe('AddSolicitudServicioComponent', () => {
  let component: AddSolicitudServicioComponent;
  let fixture: ComponentFixture<AddSolicitudServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSolicitudServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSolicitudServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
