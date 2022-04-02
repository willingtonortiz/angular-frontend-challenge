import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { FormatDistancePipe } from './pipes/format-distance.pipe';

const COMPONENTS = [HeaderComponent, NewItemComponent];
const PIPES = [FormatDistancePipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS, ...PIPES],
  exports: [...COMPONENTS, ...PIPES],
})
export class SharedModule {}
