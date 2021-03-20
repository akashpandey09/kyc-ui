import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcicBankLoginComponent } from './icic-bank-login.component';

describe('IcicBankLoginComponent', () => {
  let component: IcicBankLoginComponent;
  let fixture: ComponentFixture<IcicBankLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcicBankLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcicBankLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
