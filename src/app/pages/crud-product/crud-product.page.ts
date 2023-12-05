import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ModalController, LoadingController } from '@ionic/angular'; // Importe o LoadingController
import { EditProductComponent } from 'src/app/modals/edit-product/edit-product.component';
import { ToastController } from '@ionic/angular';

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
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private loadingController: LoadingController // Injete o LoadingController

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

      this.productService.newProduct(formData).subscribe({
        next: async (response: any) => {
          console.log('Produto adicionado:', response);

          this.productForm.reset()
          this.productService.updateObservableProducts();
          await this.presentToast("create")
        },
        error: (error: any) => {
          console.error('Erro ao adicionar produto:', error);
        }
      });
    } else {
      console.log("form invalido");
    }
  }

  async getProducts() {
    const loading = await this.loadingController.create({
      message: 'Carregando produtos...', // Mensagem exibida no loading
      spinner: 'crescent', // Escolha um tipo de spinner
      translucent: true,
    });

    await loading.present();

    this.productService.getProducts().subscribe({
      next: (response: any) => {
        console.log('Produtos recuperados:', response);
        this.produtos = response;
        loading.dismiss(); // Dispensa o loading quando os dados são carregados
      },
      error: (error: any) => {
        console.error('Falha ao recuperar produtos:', error);
        loading.dismiss(); // Dispensa o loading em caso de erro
      },
    });
  }


  deleteProduct(produto: any) {
    const codigo = produto.cod_de_barras

    this.productService.deleteProduct(codigo).subscribe({
      next: async (response: any) => {
        console.log('Produto removido com sucesso:', response);
        this.productService.updateObservableProducts();
        await this.presentToast("delete")
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

  searchProduct(event: any) {
    const searchTerm = event.target.value; // Remove espaços em branco extras

    if (searchTerm) {
      this.productService.getProducts().subscribe({
        next: (response: any) => {
          console.log('Produtos recuperados:', response);
          this.produtos = response.filter((produto: { nome: string; cod_de_barras: number; }) =>
            produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) || produto.cod_de_barras.toString().includes(searchTerm)
          );
        },
        error: (error: any) => {
          console.error('Falha ao recuperar produtos:', error);
        }
      });
    } else {
      this.getProducts();
    }
  }


  async presentToast(operation: string) {
    if (operation === 'create') {
      const toast = await this.toastController.create({
        message: 'Produto registrado com sucesso!',
        duration: 1500,
        position: 'top',
      });

      await toast.present();
    }

    if (operation === 'delete') {
      const toast = await this.toastController.create({
        message: 'Produto removido com sucesso!',
        duration: 1500,
        position: 'top',
      });

      await toast.present();
    }
  }
}
