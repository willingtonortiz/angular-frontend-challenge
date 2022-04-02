import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  _pageSize = 10;
  _itemsCount = 0;

  @Input() set pageSize(value: number) {
    this._pageSize = value;
    this.updatePageCount();
  }

  @Input() set itemsCount(value: number) {
    this._itemsCount = value;
    this.updatePageCount();
  }

  @Input() page = 1;
  @Output() pageChanged = new EventEmitter<number>();

  pagesCount = 0;
  pages: number[] = [];

  updatePageCount() {
    this.pagesCount = Math.ceil(this._itemsCount / this._pageSize);
    this.pages = Array.from({ length: this.pagesCount }).map((_, i) => i + 1);
  }

  nextPage() {
    if (this.page + 1 > this.pagesCount) {
      return;
    }

    this.setPage(this.page + 1);
  }

  previousPage() {
    if (this.page - 1 <= 0) {
      return;
    }

    this.setPage(this.page - 1);
  }

  setPage(page: number) {
    this.page = page;
    this.pageChanged.emit(this.page);
  }
}
