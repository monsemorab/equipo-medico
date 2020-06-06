import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOrdenTrabajoAtendidasComponent } from './lista-orden-trabajo-atendidas.component';

describe('ListaOrdenTrabajoAtendidasComponent', () => {
  let component: ListaOrdenTrabajoAtendidasComponent;
  let fixture: ComponentFixture<ListaOrdenTrabajoAtendidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaOrdenTrabajoAtendidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaOrdenTrabajoAtendidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
