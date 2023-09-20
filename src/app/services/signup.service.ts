import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  registerUser(usuarioData: { name: string; email: string; password: string; }): Observable<any> {
    const url = 'http://localhost:3000/signup'; // Substitua pela URL da sua API

    // Realize a requisição POST
    console.log("usuarioData", usuarioData);
    return this.http.post(url, usuarioData);
  }

}
