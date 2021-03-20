import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcicBankHomeScreenComponent } from './icic-bank-home-screen.component';

describe('IcicBankHomeScreenComponent', () => {
  let component: IcicBankHomeScreenComponent;
  let fixture: ComponentFixture<IcicBankHomeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcicBankHomeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcicBankHomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
