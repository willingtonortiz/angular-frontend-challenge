import { Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MainLayoutComponent } from './main-layout.component';

@Component({ template: `` })
export class DummyComponent {}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full',
  },
  {
    path: 'news',
    component: DummyComponent,
  },
  {
    path: 'favorites',
    component: DummyComponent,
  },
];

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [MainLayoutComponent, DummyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the navigation items', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const navItems = compiled.querySelectorAll('.navbar__item');
    const allItem = navItems.item(0);
    const myFavesItem = navItems.item(1);

    expect(allItem.textContent?.trim()).toBe('All');
    expect(myFavesItem.textContent?.trim()).toBe('My faves');
  });

  it('should add the active class when a route is active', fakeAsync(() => {
    const NEWS_ROUTE = 'news';
    router.navigate([NEWS_ROUTE]);
    tick();

    const compiled = fixture.nativeElement as HTMLElement;
    const navItems = compiled.querySelectorAll('.navbar__item');
    const allItem = navItems.item(0);

    expect(allItem.classList.contains('active')).toBeTrue();
  }));
});
