import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditEquipoComponent } from './edit-equipo.component';

describe('EditEquipoComponent', () => {
  let component: EditEquipoComponent;
  let fixture: ComponentFixture<EditEquipoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
