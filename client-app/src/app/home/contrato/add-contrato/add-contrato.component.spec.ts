import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddContratoComponent } from './add-contrato.component';

describe('AddContratoComponent', () => {
  let component: AddContratoComponent;
  let fixture: ComponentFixture<AddContratoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
