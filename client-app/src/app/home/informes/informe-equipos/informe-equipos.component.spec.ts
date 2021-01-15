import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InformeEquiposComponent } from './informe-equipos.component';

describe('InformeEquiposComponent', () => {
  let component: InformeEquiposComponent;
  let fixture: ComponentFixture<InformeEquiposComponent>;

  beforeEach(waitForAsync(() => {
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
