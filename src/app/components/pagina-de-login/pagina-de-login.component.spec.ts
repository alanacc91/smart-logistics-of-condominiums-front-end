import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDeLoginComponent } from './pagina-de-login.component';

describe('PaginaDeLoginComponent', () => {
  let component: PaginaDeLoginComponent;
  let fixture: ComponentFixture<PaginaDeLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaDeLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaDeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
