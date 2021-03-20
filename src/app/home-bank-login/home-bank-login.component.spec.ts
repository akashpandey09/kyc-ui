import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBankLoginComponent } from './home-bank-login.component';

describe('HomeBankLoginComponent', () => {
  let component: HomeBankLoginComponent;
  let fixture: ComponentFixture<HomeBankLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBankLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBankLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
