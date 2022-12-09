import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../core/material/material.module';
const component = [HeaderComponent];
@NgModule({
  declarations: [...component, HeaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [...component],
})
export class SharedModule {}
