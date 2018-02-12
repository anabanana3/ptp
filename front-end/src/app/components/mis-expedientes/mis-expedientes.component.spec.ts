import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisExpedientesComponent } from './mis-expedientes.component';

describe('MisExpedientesComponent', () => {
  let component: MisExpedientesComponent;
  let fixture: ComponentFixture<MisExpedientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisExpedientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisExpedientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
