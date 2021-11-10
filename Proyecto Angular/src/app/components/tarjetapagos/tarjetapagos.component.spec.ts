import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetapagosComponent } from './tarjetapagos.component';

describe('TarjetapagosComponent', () => {
  let component: TarjetapagosComponent;
  let fixture: ComponentFixture<TarjetapagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetapagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetapagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
