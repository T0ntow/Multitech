import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

//components
import { ProductComponent } from 'src/app/components/product/product.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
//http

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [
    HomePage,
    HeaderComponent,
    ProductComponent]
})
export class HomePageModule {}
