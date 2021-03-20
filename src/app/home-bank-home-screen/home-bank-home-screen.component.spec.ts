import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBankHomeScreenComponent } from './home-bank-home-screen.component';

describe('HomeBankHomeScreenComponent', () => {
  let component: HomeBankHomeScreenComponent;
  let fixture: ComponentFixture<HomeBankHomeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBankHomeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBankHomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
