import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/core/material/material.module';
import { LoginComponent } from './login.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, CoreModule, MaterialModule],
})
export class LoginModule {}
