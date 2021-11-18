import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosBarberComponent } from './servicos-barber.component';

describe('ServicosBarberComponent', () => {
  let component: ServicosBarberComponent;
  let fixture: ComponentFixture<ServicosBarberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicosBarberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicosBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
