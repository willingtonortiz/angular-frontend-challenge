import { ComponentFixture, TestBed } from '@angular/core/testing';
import { subDays } from 'date-fns';
import { FormatDistancePipe } from '../../pipes';

import { NewItemComponent } from './new-item.component';

describe('NewItemComponent', () => {
  let component: NewItemComponent;
  let fixture: ComponentFixture<NewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewItemComponent, FormatDistancePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the new title on input', () => {
    const CUSTOM_TITLE = 'My Awesome Title';

    component.title = CUSTOM_TITLE;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.getElementsByClassName('new-title')[0]?.textContent?.trim()
    ).toBe(CUSTOM_TITLE);
  });

  it('should render the new author on input', () => {
    const CUSTOM_AUTHOR = 'An Author Name';

    component.author = CUSTOM_AUTHOR;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled
        .getElementsByClassName('new-time-and-author')[0]
        ?.textContent?.trim()
    ).toContain(CUSTOM_AUTHOR);
  });

  it('should render the difference between today an the creation date of the new on input', () => {
    const TODAY = new Date();
    const YESTERDAY = subDays(TODAY, 1);
    const EXPECTED = '1 day ago';

    component.createdAt = YESTERDAY;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled
        .getElementsByClassName('new-time-and-author')[0]
        ?.textContent?.trim()
    ).toContain(EXPECTED);
  });

  it('should have the new url passed on input in the anchor tag', () => {
    const NEW_URL = 'www.google.com';

    component.url = NEW_URL;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.getElementsByClassName('content')[0]?.getAttribute('href')
    ).toContain(NEW_URL);
  });

  it('should emit and event when the favorite icon is clicked', () => {
    // Spy on emitter
    spyOn(component.favoriteToggled, 'emit');

    // Trigger click event
    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.getElementsByClassName('icon')[0];
    icon.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.favoriteToggled.emit).toHaveBeenCalled();
  });
});
