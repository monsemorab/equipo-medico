import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeEquiposComponent } from './informe-equipos.component';

describe('InformeEquiposComponent', () => {
  let component: InformeEquiposComponent;
  let fixture: ComponentFixture<InformeEquiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeEquiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
