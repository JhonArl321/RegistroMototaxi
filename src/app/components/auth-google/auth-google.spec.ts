import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGoogleComponent } from './auth-google';

describe('AuthGoogle', () => {
  let component: AuthGoogleComponent;
  let fixture: ComponentFixture<AuthGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthGoogleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthGoogleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
