import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoyaltySummaryComponent } from './user-loyalty-summary.component';

describe('UserLoyaltySummaryComponent', () => {
  let component: UserLoyaltySummaryComponent;
  let fixture: ComponentFixture<UserLoyaltySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoyaltySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoyaltySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
