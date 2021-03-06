import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddRepuestoComponent } from './add-repuesto.component';

describe('AddRepuestoComponent', () => {
  let component: AddRepuestoComponent;
  let fixture: ComponentFixture<AddRepuestoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRepuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
