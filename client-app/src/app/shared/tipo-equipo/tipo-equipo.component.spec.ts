import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TipoEquipoComponent } from './tipo-equipo.component';

describe('TipoEquipoComponent', () => {
  let component: TipoEquipoComponent;
  let fixture: ComponentFixture<TipoEquipoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
