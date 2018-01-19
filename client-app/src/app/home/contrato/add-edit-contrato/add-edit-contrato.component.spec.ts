import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditContratoComponent } from './add-edit-contrato.component';

describe('AddEditContratoComponent', () => {
  let component: AddEditContratoComponent;
  let fixture: ComponentFixture<AddEditContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
