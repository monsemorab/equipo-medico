import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditRepuestoComponent } from './edit-repuesto.component';

describe('EditRepuestoComponent', () => {
  let component: EditRepuestoComponent;
  let fixture: ComponentFixture<EditRepuestoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRepuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
