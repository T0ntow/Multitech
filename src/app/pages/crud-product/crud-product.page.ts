import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ModalController } from '@ionic/angular';
import { EditProductComponent } from 'src/app/modals/edit-product/edit-product.component';

@Component({
  selector: 'app-crud-product',
  templateUrl: './crud-product.page.html',
  styleUrls: ['./crud-product.page.scss'],
})
export class CrudProductPage implements OnInit {

  productForm: FormGroup;
  produtos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private modalCtrl: ModalController
  ) {

    this.productService.getObservableProducts().subscribe(isUpdated => {
      this.getProducts()
    })

    this.productForm = this.formBuilder.group({
      codigo: ['', Validators.required],
      nome: ['', Validators.required],
      estoque: ['', [Validators.required, Validators.min(0)]],
      preco: ['', [Validators.required, Validators.min(0)]],
      percent: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    this.getProducts()

  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;

      // Os dados do formulário estão em this.productForm.value
      this.productService.newProduct(formData).subscribe({
        next: (response: any) => {
          console.log('Produto adicionado:', response);
          this.productForm.reset()
          this.productService.updateObservableProducts();
        },
        error: (error: any) => {
          console.error('Erro ao adicionar produto:', error);
        }
      });
    } else {
      console.log("form invalido");
    }
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        console.log('Produtos recuperados:', response);
        this.produtos = response
      },
      error: (error: any) => {
        console.error('Falha ao recuperar produtos:', error);
      }
    });
  }

  deleteProduct(produto: any) {
    const codigo = produto.cod_de_barras

    this.productService.deleteProduct(codigo).subscribe({
      next: (response: any) => {
        console.log('Produto removido com sucesso:', response);
        this.productService.updateObservableProducts();
      },
      error: (error: any) => {
        console.error('Falha ao remover produto:', error);
      }
    });
  }

  async editProduct(produto: any) {
    const modal = await this.modalCtrl.create({
      component: EditProductComponent,
      componentProps: {
        produto: produto
      }
    });
    modal.present();

  }

}
