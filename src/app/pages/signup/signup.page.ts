import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/services/signup.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController } from '@ionic/angular'; // Importe o AlertController

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private alertController: AlertController // Injete o AlertController
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  async submitForm() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;

      this.signupService.registerUser(userData).subscribe({
        next: (response) => {
          // Exiba um alerta de sucesso
          this.presentSuccessAlert();
          console.log('Usuário cadastrado com sucesso', response);
        },
        error: (error) => {
          // Exiba um alerta de erro

          this.presentErrorAlert(error);
          console.error('Erro ao cadastrar usuário', error);
        },
      });
    }
  }

  // Função para exibir um alerta de sucesso
  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: 'Usuário cadastrado com sucesso.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Função para exibir um alerta de erro
  async presentErrorAlert(error: any) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'Erro ao cadastrar usuário: ' + error.error.message, // Exiba a mensagem de erro
      buttons: ['OK'],
    });

    await alert.present();
  }
}
