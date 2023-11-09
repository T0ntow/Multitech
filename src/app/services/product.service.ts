import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private observerProdutct = new Subject()
  private apiUrl = 'http://localhost:3000/produtos'; // Substitua pela URL do seu servidor Express

  constructor(private http: HttpClient) {}

  getObservableProducts() {
    return this.observerProdutct.asObservable()
  }

  updateObservableProducts() {
    this.observerProdutct.next(true)
    console.log("update");
  }

  findProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  newProduct(productData: any) {
    return this.http.post('http://localhost:3000/adicionar-produto', productData)
  }

  getProducts() {
    return this.http.get('http://localhost:3000/produtos')
  }
  
  deleteProduct(codigo: any) {
    return this.http.delete(`http://localhost:3000/deletar-produto/${codigo}`)
  }

  editProduct(productData: any, codigo: any) {
    return this.http.put(`http://localhost:3000/editar-produto/${codigo}`, productData)
  }
}
