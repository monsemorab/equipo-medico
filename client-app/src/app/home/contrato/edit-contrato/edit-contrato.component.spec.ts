import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditContratoComponent } from './edit-contrato.component';

describe('EditContratoComponent', () => {
  let component: EditContratoComponent;
  let fixture: ComponentFixture<EditContratoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
