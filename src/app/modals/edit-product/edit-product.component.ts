import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup = new FormGroup({});
  @Input() produto: any;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) { }

  cancel() {
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
    this.editProductForm = this.formBuilder.group({
      codigo: [this.produto.cod_de_barras, Validators.required],
      nome: [this.produto.nome, Validators.required],
      estoque: [this.produto.qtd_estoque, [Validators.required, Validators.min(0)]],
      preco: [this.produto.preco, [Validators.required, Validators.min(0)]],
      percent: [this.produto.percent_comissao, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  onSubmit() {
    if (this.editProductForm.valid) {
      const formData = this.editProductForm.value;
      const codigo = this.produto.cod_de_barras

      this.productService.editProduct(formData, codigo).subscribe({
        next: async (response: any) => {
          console.log('Produto editado:', response);
          this.editProductForm.reset()

          this.productService.updateObservableProducts();
          this.modalCtrl.dismiss();
          await this.presentToast()
        },
        error: (error: any) => {
          console.error('Erro ao editar produto:', error);
        }
      });
    } else {
      console.log("form invalido");
      this.modalCtrl.dismiss();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Produto atualizado com sucesso!',
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
}

