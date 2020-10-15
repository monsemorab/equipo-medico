import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeRepuestosComponent } from './informe-repuestos.component';

describe('InformeRepuestosComponent', () => {
  let component: InformeRepuestosComponent;
  let fixture: ComponentFixture<InformeRepuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeRepuestosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeRepuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
