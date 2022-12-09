import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { MaterialModule } from 'src/app/core/material/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, UsersRoutingModule, MaterialModule],
})
export class UsersModule {}
