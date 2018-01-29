import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VermasComponent } from './vermas.component';

describe('VermasComponent', () => {
  let component: VermasComponent;
  let fixture: ComponentFixture<VermasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VermasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VermasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
