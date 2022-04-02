import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type Item = {
  label: string;
  image: string;
  value: any;
};

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() placeholder = '...';
  @Input() items: Item[] = [];

  showOptions = false;
  selectedItem?: Item;

  onChange = (value: Item) => {};

  onTouched = () => {};

  constructor() {}

  writeValue(item: Item): void {
    this.selectedItem = item;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  selectOption(option: Item) {
    this.showOptions = false;

    if (option.label === this.selectedItem?.label) {
      return;
    }

    this.selectedItem = option;
    this.onChange(option);
  }
}
