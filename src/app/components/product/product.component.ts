import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent  implements OnInit {
  products: any[] = [];

  @Input() product: any

  constructor() { }

  ngOnInit(): void {
    console.log(this.product);
  }

}
