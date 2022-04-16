import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutWindowComponent } from './signout-window.component';

describe('SignoutWindowComponent', () => {
  let component: SignoutWindowComponent;
  let fixture: ComponentFixture<SignoutWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignoutWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoutWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
