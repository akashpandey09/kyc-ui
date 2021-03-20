import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeviceDetailsComponent } from './user-device-details.component';

describe('UserDeviceDetailsComponent', () => {
  let component: UserDeviceDetailsComponent;
  let fixture: ComponentFixture<UserDeviceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeviceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeviceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
