import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepuestoComponent } from './repuesto.component';

describe('RepuestoComponent', () => {
  let component: RepuestoComponent;
  let fixture: ComponentFixture<RepuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
