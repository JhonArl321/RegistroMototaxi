import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGithub } from './auth-github';

describe('AuthGithub', () => {
  let component: AuthGithub;
  let fixture: ComponentFixture<AuthGithub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthGithub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthGithub);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
