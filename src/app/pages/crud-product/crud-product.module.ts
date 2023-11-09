import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudProductPageRoutingModule } from './crud-product-routing.module';
import { CrudProductPage } from './crud-product.page';

import { ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from 'src/app/modals/edit-product/edit-product.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudProductPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrudProductPage,EditProductComponent]
})
export class CrudProductPageModule {}
