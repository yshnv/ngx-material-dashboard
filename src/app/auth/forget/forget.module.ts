import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetRoutingModule } from './forget-routing.module';
import { ForgetComponent } from './forget.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [ForgetComponent],
  imports: [CommonModule, ForgetRoutingModule, CoreModule, MaterialModule],
})
export class ForgetModule {}
