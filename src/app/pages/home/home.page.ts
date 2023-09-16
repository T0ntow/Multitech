import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: any[] = [];

  constructor(
    private produtoService: ProductService
  ) {}

  ngOnInit(): void {
    this.produtoService.findProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(this.products);
      },
      error: (error) => {
        console.error('Erro ao buscar produtos:', error);
      },
    });
  }
}
