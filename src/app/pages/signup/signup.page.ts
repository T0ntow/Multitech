import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/services/signup.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private signupService: SignupService) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  submitForm() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;

      this.signupService.registerUser(userData).subscribe({
        next: (response) => {
          console.log('Usuário cadastrado com sucesso', response);
        },
        error: (error) => {
          console.error('Erro ao cadastrar usuário', error);
        },
      });
    }

  }

}
