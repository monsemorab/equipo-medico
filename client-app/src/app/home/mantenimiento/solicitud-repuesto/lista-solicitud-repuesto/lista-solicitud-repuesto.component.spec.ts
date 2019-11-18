import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSolicitudRepuestoComponent } from './lista-solicitud-repuesto.component';

describe('ListaSolicitudRepuestoComponent', () => {
  let component: ListaSolicitudRepuestoComponent;
  let fixture: ComponentFixture<ListaSolicitudRepuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSolicitudRepuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSolicitudRepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
