import { Component, EventEmitter, Input, Output } from '@angular/core';

const FAVORITE_FULL_ICON = '/assets/icon-favorite-full.png';
const FAVORITE_OUTLINED_ICON = '/assets/icon-favorite-outlined.png';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css'],
})
export class NewItemComponent {
  @Input() isFavorite = false;
  @Input() author = '';
  @Input() title = '';
  @Input() url = '';
  @Input() createdAt = new Date();
  @Output() favoriteToggled = new EventEmitter();

  now = new Date();

  constructor() {}

  favoriteToggle() {
    this.isFavorite = !this.isFavorite;
    this.favoriteToggled.emit();
  }

  get favoriteIcon() {
    if (this.isFavorite) {
      return FAVORITE_FULL_ICON;
    } else {
      return FAVORITE_OUTLINED_ICON;
    }
  }
}
