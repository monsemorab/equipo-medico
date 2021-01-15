import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AtenderOrdenTrabajoComponent } from './atender-orden-trabajo.component';

describe('AtenderOrdenTrabajoComponent', () => {
  let component: AtenderOrdenTrabajoComponent;
  let fixture: ComponentFixture<AtenderOrdenTrabajoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AtenderOrdenTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtenderOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
