import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private observerProdutct = new Subject()
  private apiUrl = 'https://multitech-api.onrender.com/produtos'; // Substitua pela URL do seu servidor Express

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
    return this.http.post('https://multitech-api.onrender.com/adicionar-produto', productData)
  }

  getProducts() {
    return this.http.get('https://multitech-api.onrender.com/produtos')
  }
  
  deleteProduct(codigo: any) {
    return this.http.delete(`https://multitech-api.onrender.com/deletar-produto/${codigo}`)
  }

  editProduct(productData: any, codigo: any) {
    return this.http.put(`https://multitech-api.onrender.com/editar-produto/${codigo}`, productData)
  }
}
