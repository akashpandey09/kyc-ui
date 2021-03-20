import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBankComponent } from './select-bank.component';

describe('SelectBankComponent', () => {
  let component: SelectBankComponent;
  let fixture: ComponentFixture<SelectBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
