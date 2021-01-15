import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaOrdenTrabajoAtendidasComponent } from './lista-orden-trabajo-atendidas.component';

describe('ListaOrdenTrabajoAtendidasComponent', () => {
  let component: ListaOrdenTrabajoAtendidasComponent;
  let fixture: ComponentFixture<ListaOrdenTrabajoAtendidasComponent>;

  beforeEach(waitForAsync(() => {
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
