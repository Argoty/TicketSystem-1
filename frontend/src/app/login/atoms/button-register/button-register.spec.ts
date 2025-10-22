import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRegister } from './button-register';

describe('ButtonRegister', () => {
  let component: ButtonRegister;
  let fixture: ComponentFixture<ButtonRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
