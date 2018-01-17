import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEquipoComponent } from './add-edit-equipo.component';

describe('AddEditEquipoComponent', () => {
  let component: AddEditEquipoComponent;
  let fixture: ComponentFixture<AddEditEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
