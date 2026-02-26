import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDispositivi } from './lista-dispositivi';

describe('ListaDispositivi', () => {
  let component: ListaDispositivi;
  let fixture: ComponentFixture<ListaDispositivi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDispositivi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDispositivi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
