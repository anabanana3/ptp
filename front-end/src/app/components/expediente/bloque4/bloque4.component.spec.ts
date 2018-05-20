import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bloque4Component } from './bloque4.component';

describe('Bloque4Component', () => {
  let component: Bloque4Component;
  let fixture: ComponentFixture<Bloque4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bloque4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bloque4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
