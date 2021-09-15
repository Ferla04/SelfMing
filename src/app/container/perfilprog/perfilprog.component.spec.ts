import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilprogComponent } from './perfilprog.component';

describe('PerfilprogComponent', () => {
  let component: PerfilprogComponent;
  let fixture: ComponentFixture<PerfilprogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilprogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilprogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
