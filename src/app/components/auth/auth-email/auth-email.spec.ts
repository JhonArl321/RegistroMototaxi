import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEmail } from './auth-email';

describe('AuthEmail', () => {
  let component: AuthEmail;
  let fixture: ComponentFixture<AuthEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthEmail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthEmail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
