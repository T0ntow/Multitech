import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudProductPageRoutingModule } from './crud-product-routing.module';

import { CrudProductPage } from './crud-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudProductPageRoutingModule
  ],
  declarations: [CrudProductPage]
})
export class CrudProductPageModule {}
