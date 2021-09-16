import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BombilloComponent } from './bombillo.component';

describe('BombilloComponent', () => {
  let component: BombilloComponent;
  let fixture: ComponentFixture<BombilloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BombilloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BombilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
