import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaContratoComponent } from './lista-contrato.component';

describe('ListaContratoComponent', () => {
  let component: ListaContratoComponent;
  let fixture: ComponentFixture<ListaContratoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
