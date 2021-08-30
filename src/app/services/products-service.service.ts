import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getProductDetail(id:number):Product{
    return this.products[id-1]
  }
}
