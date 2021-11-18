import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoComprasBarberComponent } from './carrinho-compras-barber.component';

describe('CarrinhoComprasBarberComponent', () => {
  let component: CarrinhoComprasBarberComponent;
  let fixture: ComponentFixture<CarrinhoComprasBarberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrinhoComprasBarberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrinhoComprasBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
