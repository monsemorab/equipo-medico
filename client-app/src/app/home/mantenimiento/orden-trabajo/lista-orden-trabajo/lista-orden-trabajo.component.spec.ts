import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaOrdenTrabajoComponent } from './lista-orden-trabajo.component';

describe('ListaOrdenTrabajoComponent', () => {
  let component: ListaOrdenTrabajoComponent;
  let fixture: ComponentFixture<ListaOrdenTrabajoComponent>;

  beforeEach(waitForAsync(() => {
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
