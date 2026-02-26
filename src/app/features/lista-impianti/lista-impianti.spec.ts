import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaImpianti } from './lista-impianti';

describe('ListaImpianti', () => {
  let component: ListaImpianti;
  let fixture: ComponentFixture<ListaImpianti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaImpianti]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaImpianti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
