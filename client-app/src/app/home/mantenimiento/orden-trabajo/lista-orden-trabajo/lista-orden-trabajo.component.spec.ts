import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOrdenTrabajoComponent } from './lista-orden-trabajo.component';

describe('ListaOrdenTrabajoComponent', () => {
  let component: ListaOrdenTrabajoComponent;
  let fixture: ComponentFixture<ListaOrdenTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaOrdenTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
