import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModeloEquipoComponent } from './modelo-equipo.component';

describe('ModeloEquipoComponent', () => {
  let component: ModeloEquipoComponent;
  let fixture: ComponentFixture<ModeloEquipoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeloEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
