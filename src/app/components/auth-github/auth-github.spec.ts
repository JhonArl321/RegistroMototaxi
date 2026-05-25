import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGithubComponent} from './auth-github';

describe('AuthGithub', () => {
  let component: AuthGithubComponent;
  let fixture: ComponentFixture<AuthGithubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthGithubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthGithubComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
