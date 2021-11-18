import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoBarberComponent } from './contato-barber.component';

describe('ContatoBarberComponent', () => {
  let component: ContatoBarberComponent;
  let fixture: ComponentFixture<ContatoBarberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContatoBarberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
