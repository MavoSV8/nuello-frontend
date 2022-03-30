import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninWindowComponent } from './signin-window.component';

describe('SigninWindowComponent', () => {
  let component: SigninWindowComponent;
  let fixture: ComponentFixture<SigninWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
