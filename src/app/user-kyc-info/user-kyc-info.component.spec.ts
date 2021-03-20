import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKycInfoComponent } from './user-kyc-info.component';

describe('UserKycInfoComponent', () => {
  let component: UserKycInfoComponent;
  let fixture: ComponentFixture<UserKycInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserKycInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserKycInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
