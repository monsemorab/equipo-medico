import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeContratosComponent } from './informe-contratos.component';

describe('InformeContratosComponent', () => {
  let component: InformeContratosComponent;
  let fixture: ComponentFixture<InformeContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeContratosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
