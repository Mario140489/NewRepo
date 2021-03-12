/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MessagensComponent } from './messagens.component';

describe('MessagensComponent', () => {
  let component: MessagensComponent;
  let fixture: ComponentFixture<MessagensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
