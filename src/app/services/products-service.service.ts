import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './categories-service.service';

export interface Product{
  id:number
  name:string
  code:string
  price:number
  expireDate:string
  category:string
}


@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {


  URL = "https://localhost:5001/api/articles"

  products: Product[] =[
    {
      id:1,
      name:"pesca",
      code:"9432292933",
      price:1.2,
      expireDate: "4-12-2022",
      category:"A",
    },
    {
      id:2,
      name:"mela",
      code:"4878493829",
      price:1.6,
      expireDate: "23-12-2022",
      category:"A",
    },
    {
      id:3,
      name:"crema mani",
      code:"4870093829",
      price:3.5,
      expireDate: "5-3-2023",
      category:"B",
    }

  ]

  constructor(private http:HttpClient) { }

  getProductsProva():Product[]{
    return this.products
  }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.URL)
  }

  getProductDetail(id:number):Observable<Product>{
    return this.http.get<Product>(this.URL+"/"+id)
  }

  deleteProduct(id:number):Observable<Product>{
    return this.http.delete<Product>(this.URL+"/"+id)
  }

  saveProduct(data: Product) {
    if(data.id) {
      return this.http.put(this.URL+'/'+data.id, data)
    } else {
      return this.http.post(this.URL, data)
    }
  }
}
