import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/produtos'; // Substitua pela URL do seu servidor Express

  constructor(private http: HttpClient) {}

  findProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
}
