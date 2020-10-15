import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudRepuestoDetalleComponent } from './solicitud-repuesto-detalle.component';

describe('SolicitudRepuestoDetalleComponent', () => {
  let component: SolicitudRepuestoDetalleComponent;
  let fixture: ComponentFixture<SolicitudRepuestoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudRepuestoDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudRepuestoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
