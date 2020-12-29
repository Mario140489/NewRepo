import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEspecComponent } from './table-espec.component';

describe('TableEspecComponent', () => {
  let component: TableEspecComponent;
  let fixture: ComponentFixture<TableEspecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableEspecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEspecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
