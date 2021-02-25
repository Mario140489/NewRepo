/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubmoduloComponent } from './submodulo.component';

describe('SubmoduloComponent', () => {
  let component: SubmoduloComponent;
  let fixture: ComponentFixture<SubmoduloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmoduloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmoduloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
