import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the pageSize on input', () => {
    const PAGE_SIZE = 20;

    component.pageSize = PAGE_SIZE;
    fixture.detectChanges();

    expect(component._pageSize).toBe(PAGE_SIZE);
  });

  it('should update the itemsCount on input', () => {
    const ITEMS_COUNT = 1000;

    component.itemsCount = ITEMS_COUNT;
    fixture.detectChanges();

    expect(component._itemsCount).toBe(ITEMS_COUNT);
  });

  it('should calculate the pagesCount on input', () => {
    const PAGE_SIZE = 20;
    const ITEMS_COUNT = 1000;
    const PAGES_COUNT = Math.ceil(ITEMS_COUNT / PAGE_SIZE);

    component.pageSize = PAGE_SIZE;
    component.itemsCount = ITEMS_COUNT;
    fixture.detectChanges();

    expect(component.pagesCount).toBe(PAGES_COUNT);
  });

  it('should emit the pageChanged event when the left button is clicked', () => {
    const PAGE_SIZE = 10;
    const ITEMS_COUNT = 100;
    const CURRENT_PAGE = 5;

    // Setting up page component with 10 pages
    component.pageSize = PAGE_SIZE;
    component.itemsCount = ITEMS_COUNT;
    component.page = CURRENT_PAGE;
    fixture.detectChanges();

    // Spy on emitter
    spyOn(component.pageChanged, 'emit');

    //  Trigger click event
    const compiled = fixture.nativeElement as HTMLElement;
    const leftButton = compiled.getElementsByClassName('button')[0];
    leftButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.pageChanged.emit).toHaveBeenCalled();
  });

  it('should emit the pageChanged event when the right button is clicked', () => {
    const PAGE_SIZE = 10;
    const ITEMS_COUNT = 100;
    const CURRENT_PAGE = 5;

    // Setting up page component with 10 pages
    component.pageSize = PAGE_SIZE;
    component.itemsCount = ITEMS_COUNT;
    component.page = CURRENT_PAGE;
    fixture.detectChanges();

    // Spy on emitter
    spyOn(component.pageChanged, 'emit');

    //  Trigger click event
    const compiled = fixture.nativeElement as HTMLElement;
    const rightButton = compiled.getElementsByClassName('button')[1];
    rightButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.pageChanged.emit).toHaveBeenCalled();
  });

  it('should not emit the pageChanged event when the first page is selected and the left button is clicked', () => {
    const PAGE_SIZE = 10;
    const ITEMS_COUNT = 100;
    const CURRENT_PAGE = 1;

    // Setting up page component with 10 pages
    component.pageSize = PAGE_SIZE;
    component.itemsCount = ITEMS_COUNT;
    component.page = CURRENT_PAGE;
    fixture.detectChanges();

    // Spy on emitter
    spyOn(component.pageChanged, 'emit');

    //  Trigger click event
    const compiled = fixture.nativeElement as HTMLElement;
    const leftButton = compiled.getElementsByClassName('button')[0];
    leftButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('should not emit the pageChanged event when the last page is selected and the right button is clicked', () => {
    const PAGE_SIZE = 10;
    const ITEMS_COUNT = 100;
    const CURRENT_PAGE = 10;

    // Setting up page component with 10 pages
    component.pageSize = PAGE_SIZE;
    component.itemsCount = ITEMS_COUNT;
    component.page = CURRENT_PAGE;
    fixture.detectChanges();

    // Spy on emitter
    spyOn(component.pageChanged, 'emit');

    //  Trigger click event
    const compiled = fixture.nativeElement as HTMLElement;
    const rightButton = compiled.getElementsByClassName('button')[1];
    rightButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('should emit the pageChanged event when a page button is clicked', () => {
    const PAGE_SIZE = 10;
    const ITEMS_COUNT = 100;
    const CURRENT_PAGE = 5;

    // Setting up page component with 10 pages
    component.pageSize = PAGE_SIZE;
    component.itemsCount = ITEMS_COUNT;
    component.page = CURRENT_PAGE;
    fixture.detectChanges();

    // Spy on emitter
    spyOn(component.pageChanged, 'emit');

    //  Trigger click event
    const compiled = fixture.nativeElement as HTMLElement;
    const pageButton = compiled.getElementsByClassName('page')[1];
    pageButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.pageChanged.emit).toHaveBeenCalled();
  });
});
