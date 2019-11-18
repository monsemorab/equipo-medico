import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSolicitudRepuestoComponent } from './add-solicitud-repuesto.component';

describe('AddSolicitudRepuestoComponent', () => {
  let component: AddSolicitudRepuestoComponent;
  let fixture: ComponentFixture<AddSolicitudRepuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSolicitudRepuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSolicitudRepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
