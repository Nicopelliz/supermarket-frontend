import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './categories-service.service';

export interface Product {
  id: number
  name: string
  code: number
  price: number
  imgURL?: string
  expiration?: string | null
  CatID: number
}

@Injectable({
  providedIn: 'root'
})

export class ProductsServiceService {

  URL = "https://localhost:5001/api/articles"
  products: Product[] = []

  constructor(private http: HttpClient) { }

  // http GET
  getProducts(search: string): Observable<Product[]> {
    if (search !== "") {
      return this.http.get<Product[]>(this.URL + "?name=" + search)
    } else {
      return this.http.get<Product[]>(this.URL)
    }
  }


  // http GET/ID
  getProductDetail(id: number): Observable<Product> {
    return this.http.get<Product>(this.URL + "/" + id)
  }

  // http DELETE
  deleteProduct(id: string): Observable<unknown> {
    return this.http.delete(this.URL + "/" + id)
  }

  // http POST & PUT
  saveProduct(id: string, data: Product, isNew: boolean) {
    if (data.expiration === "") {
      data.expiration = null
    }
    if (!isNew) {
      data.id = parseInt(id)
      return this.http.put(this.URL + '/' + id, data)
    } else {
      return this.http.post(this.URL, data)
    }
  }
}
