import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddEquipoComponent } from './add-equipo.component';

describe('AddEquipoComponent', () => {
  let component: AddEquipoComponent;
  let fixture: ComponentFixture<AddEquipoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
