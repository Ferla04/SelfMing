import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobaremailComponent } from './aprobaremail.component';

describe('AprobaremailComponent', () => {
  let component: AprobaremailComponent;
  let fixture: ComponentFixture<AprobaremailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobaremailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobaremailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
