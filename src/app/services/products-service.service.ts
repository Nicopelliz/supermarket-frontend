import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './categories-service.service';

export interface Product {
  id: number
  name: string
  code: string
  price: number
  expireDate: string
  category: string
}


@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {


  URL = "https://localhost:5001/api/articles"

  products: Product[] = []

  constructor(private http: HttpClient) { }

  getProductsProva(): Product[] {
    return this.products
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL)
  }

  getProductDetail(id: number): Observable<Product> {
    return this.http.get<Product>(this.URL + "/" + id)
  }

  deleteProduct(id: string): Observable<unknown> {
    return this.http.delete(this.URL + "/" + id)
  }

  saveProduct(id:string, data:Product, isNew: boolean) {
    
    if (!isNew) {
      data.id = parseInt(id)
      return this.http.put(this.URL + '/' + id, data)
    } else {
      return this.http.post(this.URL, data)
    }
  }
}
