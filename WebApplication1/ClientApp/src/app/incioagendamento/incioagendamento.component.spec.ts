import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncioagendamentoComponent } from './incioagendamento.component';

describe('IncioagendamentoComponent', () => {
  let component: IncioagendamentoComponent;
  let fixture: ComponentFixture<IncioagendamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncioagendamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncioagendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
