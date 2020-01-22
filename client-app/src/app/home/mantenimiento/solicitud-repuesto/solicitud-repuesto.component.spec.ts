import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudRepuestoComponent } from './solicitud-repuesto.component';

describe('SolicitudRepuestoComponent', () => {
  let component: SolicitudRepuestoComponent;
  let fixture: ComponentFixture<SolicitudRepuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudRepuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudRepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
