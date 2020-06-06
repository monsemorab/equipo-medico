import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMantenimientoComponent } from './edit-mantenimiento.component';

describe('EditMantenimientoComponent', () => {
  let component: EditMantenimientoComponent;
  let fixture: ComponentFixture<EditMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
